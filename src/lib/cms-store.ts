import { promises as fs } from "fs";
import path from "path";
import {
  EnquiryRecord,
  EnquiryStatus,
  ProjectItem,
  ServiceItem,
} from "@/types";
import { portfolioProjects } from "@/data/portfolio";
import { servicesData } from "@/data/services";
import { getSupabaseCredentials, supabaseFetch } from "@/lib/supabase";

const ENQUIRIES_SPOOL_FILE = path.join(process.cwd(), ".local-enquiries.json");
const CMS_SPOOL_FILE = path.join(process.cwd(), ".local-cms-store.json");

interface LocalCmsState {
  customProjects: ProjectItem[];
  deletedProjectIds: string[];
  serviceOverrides: Record<
    string,
    Partial<Pick<ServiceItem, "offeringStatus" | "summary" | "featured">>
  >;
}

async function readLocalCmsState(): Promise<LocalCmsState> {
  try {
    const raw = await fs.readFile(CMS_SPOOL_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      customProjects: Array.isArray(parsed.customProjects)
        ? parsed.customProjects
        : [],
      deletedProjectIds: Array.isArray(parsed.deletedProjectIds)
        ? parsed.deletedProjectIds
        : [],
      serviceOverrides: parsed.serviceOverrides || {},
    };
  } catch {
    return {
      customProjects: [],
      deletedProjectIds: [],
      serviceOverrides: {},
    };
  }
}

async function writeLocalCmsState(state: LocalCmsState): Promise<void> {
  try {
    await fs.writeFile(CMS_SPOOL_FILE, JSON.stringify(state, null, 2), "utf8");
  } catch {
    // Ignore on read-only serverless file systems
  }
}

/**
 * Fetches all enquiries from Supabase (if configured and reachable) merged with local spool records.
 */
export async function getAllEnquiries(): Promise<{
  enquiries: EnquiryRecord[];
  storageMode: "supabase" | "local_hybrid";
}> {
  const creds = await getSupabaseCredentials();

  if (creds.source !== "unconfigured") {
    const sbResult = await supabaseFetch<
      Array<{
        id: string;
        reference_id: string;
        full_name: string;
        email: string;
        phone: string | null;
        company: string;
        service: string;
        budget: string | null;
        description: string;
        preferred_contact: "email" | "phone" | "whatsapp";
        privacy_consent: boolean;
        status?: EnquiryStatus;
        notes?: string;
        created_at: string;
      }>
    >("enquiries?select=*&order=created_at.desc");

    if (sbResult.ok && Array.isArray(sbResult.data)) {
      return {
        storageMode: "supabase",
        enquiries: sbResult.data.map((row) => ({
          id: row.id,
          referenceId: row.reference_id,
          submittedAt: row.created_at,
          fullName: row.full_name,
          email: row.email,
          phone: row.phone || "Not provided",
          company: row.company,
          service: row.service,
          budget: row.budget || "Not specified",
          description: row.description,
          preferredContact: row.preferred_contact,
          privacyConsent: row.privacy_consent,
          status: row.status || "new",
          notes: row.notes || "",
        })),
      };
    }
  }

  // Fallback to local enquiries file
  try {
    const raw = await fs.readFile(ENQUIRIES_SPOOL_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const normalized: EnquiryRecord[] = parsed
        .map((item) => ({
          ...item,
          status: (item.status as EnquiryStatus) || "new",
          notes: item.notes || "",
        }))
        .reverse();
      return { enquiries: normalized, storageMode: "local_hybrid" };
    }
  } catch {
    // No local enquiries yet
  }

  return { enquiries: [], storageMode: "local_hybrid" };
}

export async function updateEnquiryStatus(
  referenceId: string,
  status: EnquiryStatus,
  notes?: string
): Promise<boolean> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sbRes = await supabaseFetch(
      `enquiries?reference_id=eq.${encodeURIComponent(referenceId)}`,
      {
        method: "PATCH",
        body: {
          status,
          ...(notes !== undefined ? { notes } : {}),
        },
      }
    );
    if (sbRes.ok) return true;
  }

  try {
    const raw = await fs.readFile(ENQUIRIES_SPOOL_FILE, "utf8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      const updated = list.map((item) =>
        item.referenceId === referenceId
          ? {
              ...item,
              status,
              ...(notes !== undefined ? { notes } : {}),
            }
          : item
      );
      await fs.writeFile(
        ENQUIRIES_SPOOL_FILE,
        JSON.stringify(updated, null, 2),
        "utf8"
      );
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function deleteEnquiryByReference(
  referenceId: string
): Promise<boolean> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sbRes = await supabaseFetch(
      `enquiries?reference_id=eq.${encodeURIComponent(referenceId)}`,
      {
        method: "DELETE",
      }
    );
    if (sbRes.ok) return true;
  }

  try {
    const raw = await fs.readFile(ENQUIRIES_SPOOL_FILE, "utf8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      const filtered = list.filter(
        (item) => item.referenceId !== referenceId
      );
      await fs.writeFile(
        ENQUIRIES_SPOOL_FILE,
        JSON.stringify(filtered, null, 2),
        "utf8"
      );
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

/**
 * Returns combined Portfolio Projects (default + custom added from Admin / Supabase).
 */
export async function getManagedProjects(): Promise<ProjectItem[]> {
  const state = await readLocalCmsState();
  const base = portfolioProjects.filter(
    (p) => !state.deletedProjectIds.includes(p.id)
  );
  return [...state.customProjects, ...base];
}

export async function addManagedProject(
  project: Omit<
    ProjectItem,
    "id" | "disclosureNote" | "gallery" | "outcomes"
  >
): Promise<ProjectItem> {
  const state = await readLocalCmsState();
  const newProject: ProjectItem = {
    ...project,
    id: `proj-custom-${Date.now().toString(36)}`,
    disclosureNote: "Published via Rive Digitals Admin Studio.",
    gallery: [
      {
        src: project.thumbnail,
        alt: project.thumbnailAlt,
        caption: project.summary,
      },
    ],
    outcomes: [
      {
        label: "Delivered Scope",
        detail: project.summary,
        verified: true,
      },
    ],
  };

  state.customProjects.unshift(newProject);
  await writeLocalCmsState(state);

  // Also sync to Supabase `projects` table if connected
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch("projects", {
      method: "POST",
      body: {
        id: newProject.id,
        slug: newProject.slug,
        title: newProject.title,
        client_or_industry: newProject.clientOrIndustry,
        category: newProject.category,
        tags: newProject.tags,
        thumbnail: newProject.thumbnail,
        thumbnail_alt: newProject.thumbnailAlt,
        summary: newProject.summary,
        brief: newProject.brief,
        challenge: newProject.challenge,
        solution: newProject.solution,
        deliverables: newProject.deliverables,
        featured: newProject.featured,
        completed_year: newProject.completedYear,
      },
    });
  }

  return newProject;
}

export async function deleteManagedProject(projectId: string): Promise<void> {
  const state = await readLocalCmsState();
  state.customProjects = state.customProjects.filter((p) => p.id !== projectId);
  if (!state.deletedProjectIds.includes(projectId)) {
    state.deletedProjectIds.push(projectId);
  }
  await writeLocalCmsState(state);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch(`projects?id=eq.${encodeURIComponent(projectId)}`, {
      method: "DELETE",
    });
  }
}

export async function getManagedServices(): Promise<ServiceItem[]> {
  const state = await readLocalCmsState();
  return servicesData.map((svc) => ({
    ...svc,
    ...(state.serviceOverrides[svc.id] || {}),
  }));
}

export async function updateManagedService(
  serviceId: string,
  updates: Partial<Pick<ServiceItem, "offeringStatus" | "summary" | "featured">>
): Promise<void> {
  const state = await readLocalCmsState();
  state.serviceOverrides[serviceId] = {
    ...(state.serviceOverrides[serviceId] || {}),
    ...updates,
  };
  await writeLocalCmsState(state);
}
