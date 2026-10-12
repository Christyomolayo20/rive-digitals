import { NextRequest, NextResponse } from "next/server";
import {
  getAllEnquiries,
  updateEnquiryStatus,
  deleteEnquiryByReference,
  getManagedProjects,
  addManagedProject,
  deleteManagedProject,
  getManagedServices,
  updateManagedService,
} from "@/lib/cms-store";
import {
  getSupabaseCredentials,
  saveRuntimeSupabaseCredentials,
  supabaseFetch,
} from "@/lib/supabase";
import { EnquiryStatus, ProjectCategory, ServiceOfferingStatus } from "@/types";
import { sanitizePlainText } from "@/lib/utils";

const DEFAULT_ADMIN_PASSCODE =
  process.env.ADMIN_PASSCODE || "rive-admin-2026";

function isAuthorized(request: NextRequest): boolean {
  const headerKey = request.headers.get("x-admin-passcode");
  const cookieKey = request.cookies.get("rive_admin_session")?.value;
  return (
    headerKey === DEFAULT_ADMIN_PASSCODE ||
    cookieKey === DEFAULT_ADMIN_PASSCODE
  );
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { authorized: false, message: "Admin authentication required." },
      { status: 401 }
    );
  }

  const [{ enquiries, storageMode }, projects, services, sbCreds] =
    await Promise.all([
      getAllEnquiries(),
      getManagedProjects(),
      getManagedServices(),
      getSupabaseCredentials(),
    ]);

  let supabaseTableStatus: "connected" | "schema_needed" | "unconfigured" =
    "unconfigured";
  if (sbCreds.source !== "unconfigured") {
    const ping = await supabaseFetch("enquiries?select=id&limit=1");
    supabaseTableStatus = ping.ok ? "connected" : "schema_needed";
  }

  return NextResponse.json({
    authorized: true,
    storageMode,
    supabase: {
      configured: sbCreds.source !== "unconfigured",
      source: sbCreds.source,
      url: sbCreds.url ? `${sbCreds.url.slice(0, 28)}...` : "",
      tableStatus: supabaseTableStatus,
    },
    enquiries,
    projects,
    services,
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));

  // 1. Login action
  if (body.action === "login") {
    if (body.passcode === DEFAULT_ADMIN_PASSCODE) {
      const response = NextResponse.json({
        authorized: true,
        message: "Authenticated successfully.",
      });
      response.cookies.set("rive_admin_session", DEFAULT_ADMIN_PASSCODE, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      return response;
    }
    return NextResponse.json(
      { authorized: false, message: "Invalid admin passcode." },
      { status: 401 }
    );
  }

  // 2. Logout action
  if (body.action === "logout") {
    const response = NextResponse.json({ authorized: false });
    response.cookies.delete("rive_admin_session");
    return response;
  }

  if (!isAuthorized(request)) {
    return NextResponse.json(
      { authorized: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // 3. Configure Supabase credentials from Admin UI
  if (body.action === "connect_supabase") {
    const url = String(body.url || "").trim();
    const key = String(body.key || "").trim();
    if (!url.startsWith("https://") || key.length < 20) {
      return NextResponse.json(
        {
          ok: false,
          message:
            "Please provide a valid https:// Supabase Project URL and API Key.",
        },
        { status: 400 }
      );
    }
    await saveRuntimeSupabaseCredentials(url, key);
    const ping = await supabaseFetch("enquiries?select=id&limit=1");
    return NextResponse.json({
      ok: true,
      tableReady: ping.ok,
      message: ping.ok
        ? "Connected to Supabase Postgres (`enquiries` table verified)!"
        : "Supabase URL & Key saved! Next, run `supabase/schema.sql` in your Supabase SQL Editor to create the tables.",
    });
  }

  // 4. Add a new Portfolio Project
  if (body.action === "add_project") {
    const title = sanitizePlainText(String(body.title || ""));
    const clientOrIndustry = sanitizePlainText(
      String(body.clientOrIndustry || "")
    );
    const category = (body.category ||
      "Web Design & Development") as ProjectCategory;
    const summary = sanitizePlainText(String(body.summary || ""));
    const thumbnail =
      String(body.thumbnail || "").trim() ||
      "/images/portfolio/atelier-kora.jpg";

    if (title.length < 3 || summary.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          message: "Please provide a project title and summary.",
        },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const created = await addManagedProject({
      slug: `${slug}-${Date.now().toString(36).slice(-3)}`,
      title,
      clientOrIndustry: clientOrIndustry || "Digital Client Partner",
      category,
      tags: String(body.tags || "Brand, Web, Growth")
        .split(",")
        .map((t) => sanitizePlainText(t))
        .filter(Boolean),
      thumbnail,
      thumbnailAlt: `${title} project showcase`,
      summary,
      brief: sanitizePlainText(String(body.brief || summary)),
      challenge: sanitizePlainText(
        String(
          body.challenge ||
            "Needed a modern, high-converting digital experience aligned with business growth."
        )
      ),
      solution: sanitizePlainText(
        String(
          body.solution ||
            "Architected a responsive design system and conversion-focused platform."
        )
      ),
      deliverables: String(
        body.deliverables ||
          "Visual Identity System, Responsive Web Platform, SEO & Analytics Setup"
      )
        .split(",")
        .map((d) => sanitizePlainText(d))
        .filter(Boolean),
      featured: Boolean(body.featured),
      completedYear: String(new Date().getFullYear()),
    });

    return NextResponse.json({ ok: true, project: created });
  }

  return NextResponse.json(
    { ok: false, message: "Unknown action" },
    { status: 400 }
  );
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));

  if (body.type === "enquiry_status") {
    const ok = await updateEnquiryStatus(
      String(body.referenceId),
      body.status as EnquiryStatus,
      body.notes !== undefined ? sanitizePlainText(String(body.notes)) : undefined
    );
    return NextResponse.json({ ok });
  }

  if (body.type === "service_update") {
    await updateManagedService(String(body.serviceId), {
      offeringStatus: body.offeringStatus as ServiceOfferingStatus,
      summary: body.summary
        ? sanitizePlainText(String(body.summary))
        : undefined,
      featured:
        typeof body.featured === "boolean" ? body.featured : undefined,
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 400 });
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const referenceId = searchParams.get("referenceId");
  const projectId = searchParams.get("projectId");

  if (referenceId) {
    const ok = await deleteEnquiryByReference(referenceId);
    return NextResponse.json({ ok });
  }

  if (projectId) {
    await deleteManagedProject(projectId);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: false }, { status: 400 });
}
