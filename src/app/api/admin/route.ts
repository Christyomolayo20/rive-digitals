import { NextRequest, NextResponse } from "next/server";
import {
  getAboutSections,
  saveAboutSection,
  getTeamMembers,
  saveTeamMember,
  deleteTeamMember,
  getServices,
  saveService,
  deleteService,
  getProjects,
  saveProject,
  deleteProject,
  getContactSubmissions,
  updateContactSubmissionStatus,
  deleteContactSubmission,
  getDashboardMetrics,
} from "@/lib/cms-store";
import {
  getSupabaseCredentials,
  saveRuntimeSupabaseCredentials,
  supabaseFetch,
} from "@/lib/supabase";

function isAuthorized(request: NextRequest): boolean {
  const passcode =
    request.headers.get("x-admin-passcode") ||
    request.cookies.get("admin_session")?.value;

  const validPasscode = process.env.ADMIN_PASSCODE || "R1vedigit@l$";

  return passcode === validPasscode;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Please authenticate to access Admin API." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");

  try {
    const creds = await getSupabaseCredentials();

    if (resource === "metrics") {
      const metrics = await getDashboardMetrics();
      return NextResponse.json(metrics);
    }

    if (resource === "about") {
      const sections = await getAboutSections();
      return NextResponse.json({ sections });
    }

    if (resource === "team") {
      const team = await getTeamMembers();
      return NextResponse.json({ team });
    }

    if (resource === "services") {
      const services = await getServices();
      return NextResponse.json({ services });
    }

    if (resource === "portfolio") {
      const projects = await getProjects();
      return NextResponse.json({ projects });
    }

    if (resource === "messages") {
      const data = await getContactSubmissions();
      return NextResponse.json(data);
    }

    // Default: return everything for unified admin dashboard
    const [metrics, about, team, services, projects, messages] = await Promise.all([
      getDashboardMetrics(),
      getAboutSections(),
      getTeamMembers(),
      getServices(),
      getProjects(),
      getContactSubmissions(),
    ]);

    return NextResponse.json({
      metrics,
      about,
      team,
      services,
      projects,
      messages: messages.submissions,
      enquiries: messages.submissions, // backward compatibility
      storageMode: messages.storageMode,
      supabase: {
        configured: creds.source !== "unconfigured",
        source: creds.source,
        url: creds.url,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to load admin data",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, resource, data } = body;

    // Supabase credentials configuration
    if (action === "configure_supabase") {
      const { url, key } = data;
      if (!url || !key) {
        return NextResponse.json(
          { error: "URL and API key are required" },
          { status: 400 }
        );
      }
      await saveRuntimeSupabaseCredentials(url, key);
      return NextResponse.json({ success: true, message: "Credentials saved" });
    }

    // Test Supabase connection
    if (action === "test_supabase") {
      const creds = await getSupabaseCredentials();
      if (creds.source === "unconfigured") {
        return NextResponse.json({
          connected: false,
          message: "Supabase credentials are not configured",
        });
      }
      const testRes = await supabaseFetch("site_settings?select=id&limit=1");
      return NextResponse.json({
        connected: testRes.ok,
        status: testRes.status,
        error: testRes.error,
        message: testRes.ok
          ? "Connected to Supabase successfully"
          : `Connection error: ${testRes.error || `HTTP ${testRes.status}`}`,
      });
    }

    // Save About Section
    if (resource === "about" && data) {
      await saveAboutSection(data);
      return NextResponse.json({ success: true });
    }

    // Save Team Member
    if (resource === "team" && data) {
      const member = {
        ...data,
        id: data.id || `team-${Date.now().toString(36)}`,
      };
      await saveTeamMember(member);
      return NextResponse.json({ success: true, member });
    }

    // Save Service
    if (resource === "services" && data) {
      const service = {
        ...data,
        id: data.id || `service-${Date.now().toString(36)}`,
        slug:
          data.slug ||
          data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      };
      await saveService(service);
      return NextResponse.json({ success: true, service });
    }

    // Save Project
    if (resource === "portfolio" && data) {
      const project = {
        ...data,
        id: data.id || `proj-${Date.now().toString(36)}`,
        slug:
          data.slug ||
          data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        gallery: data.gallery || [{ src: data.thumbnail, caption: data.title }],
      };
      await saveProject(project);
      return NextResponse.json({ success: true, project });
    }

    return NextResponse.json({ error: "Invalid action or resource" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { resource, id, updates } = body;

    if (resource === "messages") {
      const success = await updateContactSubmissionStatus(
        id,
        updates.status,
        updates.isRead,
        updates.notes
      );
      return NextResponse.json({ success });
    }

    if (resource === "about" && updates) {
      await saveAboutSection({ id, ...updates });
      return NextResponse.json({ success: true });
    }

    if (resource === "team" && updates) {
      await saveTeamMember({ id, ...updates });
      return NextResponse.json({ success: true });
    }

    if (resource === "services" && updates) {
      await saveService({ id, ...updates });
      return NextResponse.json({ success: true });
    }

    if (resource === "portfolio" && updates) {
      await saveProject({ id, ...updates });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid update request" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update record",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const resource = searchParams.get("resource");
  const id = searchParams.get("id");

  if (!resource || !id) {
    return NextResponse.json(
      { error: "Resource and ID are required" },
      { status: 400 }
    );
  }

  try {
    if (resource === "team") {
      await deleteTeamMember(id);
      return NextResponse.json({ success: true });
    }

    if (resource === "services") {
      await deleteService(id);
      return NextResponse.json({ success: true });
    }

    if (resource === "portfolio") {
      await deleteProject(id);
      return NextResponse.json({ success: true });
    }

    if (resource === "messages") {
      await deleteContactSubmission(id);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unsupported resource deletion" }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to delete record",
      },
      { status: 500 }
    );
  }
}
