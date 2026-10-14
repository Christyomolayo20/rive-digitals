import { promises as fs } from "fs";
import path from "path";
import {
  AboutSectionItem,
  ContactSubmission,
  ContactSubmissionStatus,
  ProjectItem,
  ServiceItem,
  TeamMemberItem,
} from "@/types";
import { servicesData } from "@/data/services";
import { portfolioProjects } from "@/data/portfolio";
import { getSupabaseCredentials, supabaseFetch } from "@/lib/supabase";

const CMS_STORE_FILE = path.join(process.cwd(), ".local-cms-store.json");
const CONTACT_STORE_FILE = path.join(process.cwd(), ".local-enquiries.json");

interface LocalDatabaseState {
  aboutSections: AboutSectionItem[];
  teamMembers: TeamMemberItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  settings: Record<string, unknown>;
}

const DEFAULT_ABOUT_SECTIONS: AboutSectionItem[] = [
  {
    id: "about-intro",
    sectionKey: "intro",
    title: "Bridging Business Quality and Digital Perception",
    subtitle: "About Rive Digitals",
    content:
      "Rive Digitals is a full-stack digital solutions, branding, marketing and technology partner. We collaborate with startups, SMEs, and established organizations to build distinctive visual identities, high-converting websites, and measurable growth systems.",
    isPublished: true,
    displayOrder: 1,
  },
  {
    id: "about-story",
    sectionKey: "story",
    title: "Founded to Eliminate Digital Mediocrity",
    subtitle: "Our Story",
    content:
      "Too many businesses lose potential clients not because their services are lacking, but because their digital presence fails to convey the caliber of their work. Rive Digitals was established to unite senior visual craft with engineering discipline—delivering digital assets that command trust.",
    isPublished: true,
    displayOrder: 2,
  },
  {
    id: "about-mission",
    sectionKey: "mission",
    title: "High-Trust Digital Foundations",
    subtitle: "Our Mission",
    content:
      "To equip growth-minded businesses with cohesive brand systems and high-converting websites that turn audience attention into measurable client relationships.",
    isPublished: true,
    displayOrder: 3,
  },
  {
    id: "about-vision",
    sectionKey: "vision",
    title: "Practical Digital Excellence",
    subtitle: "Our Vision",
    content:
      "To be the preferred digital partner for ambitious brands worldwide—recognized for sharp positioning, architectural design quality, and dependable full-stack execution.",
    isPublished: true,
    displayOrder: 4,
  },
  {
    id: "about-values",
    sectionKey: "values",
    title: "Four Principles Behind Every Project",
    subtitle: "Core Values",
    content:
      "Our operational values govern every client interaction, line of code, and design deliverable.",
    items: [
      {
        title: "Clarity First",
        description:
          "Design and code exist to make your business easier to understand, trust, and buy from.",
        icon: "Compass",
      },
      {
        title: "Disciplined Delivery",
        description:
          "Transparent scopes, clear milestones, and clean code your team owns completely.",
        icon: "ShieldCheck",
      },
      {
        title: "Visual Craft",
        description:
          "From brand monograms to mobile load speeds, we sweat the details that signal authority.",
        icon: "Sparkles",
      },
      {
        title: "True Partnership",
        description:
          "We work alongside founders and marketing teams as an accountable growth partner.",
        icon: "Users",
      },
    ],
    isPublished: true,
    displayOrder: 5,
  },
  {
    id: "about-process",
    sectionKey: "process",
    title: "Four Simple Steps From Brief to Launch",
    subtitle: "Working Process",
    content:
      "Every engagement is delivered through a transparent, four-phase delivery framework that ensures quality and predictability.",
    items: [
      {
        number: "01",
        title: "Discovery & Strategy",
        description:
          "We analyze your business model, target market, and positioning requirements.",
      },
      {
        number: "02",
        title: "Architecture & Prototyping",
        description:
          "We design high-fidelity interactive wireframes and design tokens.",
      },
      {
        number: "03",
        title: "Production Engineering",
        description:
          "We build fast, responsive, and SEO-optimized web systems.",
      },
      {
        number: "04",
        title: "Launch & Measurement",
        description: "Rigorous QA testing, domain deployment, and handover.",
      },
    ],
    isPublished: true,
    displayOrder: 6,
  },
];

const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: "team-lead-strategy",
    name: "Christianah Olaniyi",
    role: "Creative Director & Brand Strategist",
    bio: "Spearheads brand positioning, visual identity direction, and multi-channel creative systems for ambitious digital brands.",
    image: "/images/about-studio.jpg",
    socials: {
      facebook: "https://www.facebook.com/rivedigitals",
      instagram: "https://www.instagram.com/rivedigitals",
      tiktok: "https://www.tiktok.com/@rivedigitals",
    },
    displayOrder: 1,
    isPublished: true,
  },
  {
    id: "team-lead-engineering",
    name: "Engineering Lead",
    role: "Full-Stack Web Architect",
    bio: "Oversees Next.js web application architecture, database schemas, performance optimization, and API integrations.",
    image: "/images/about-studio.jpg",
    socials: {
      facebook: "https://www.facebook.com/rivedigitals",
      instagram: "https://www.instagram.com/rivedigitals",
      tiktok: "https://www.tiktok.com/@rivedigitals",
    },
    displayOrder: 2,
    isPublished: true,
  },
];

async function readLocalDatabase(): Promise<LocalDatabaseState> {
  try {
    const raw = await fs.readFile(CMS_STORE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      aboutSections: Array.isArray(parsed.aboutSections)
        ? parsed.aboutSections
        : DEFAULT_ABOUT_SECTIONS,
      teamMembers: Array.isArray(parsed.teamMembers)
        ? parsed.teamMembers
        : DEFAULT_TEAM_MEMBERS,
      services: Array.isArray(parsed.services)
        ? parsed.services
        : servicesData,
      projects: Array.isArray(parsed.projects)
        ? parsed.projects
        : portfolioProjects,
      settings: parsed.settings || {},
    };
  } catch {
    return {
      aboutSections: DEFAULT_ABOUT_SECTIONS,
      teamMembers: DEFAULT_TEAM_MEMBERS,
      services: servicesData,
      projects: portfolioProjects,
      settings: {},
    };
  }
}

async function writeLocalDatabase(state: LocalDatabaseState): Promise<void> {
  try {
    await fs.writeFile(CMS_STORE_FILE, JSON.stringify(state, null, 2), "utf8");
  } catch {
    // Gracefully ignore on read-only environments
  }
}

// ============================================================================
// ABOUT SECTIONS
// ============================================================================

export async function getAboutSections(): Promise<AboutSectionItem[]> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sb = await supabaseFetch<any[]>("about_sections?select=*&order=display_order.asc");
    if (sb.ok && Array.isArray(sb.data) && sb.data.length > 0) {
      return sb.data.map((row) => ({
        id: row.id,
        sectionKey: row.section_key,
        title: row.title,
        subtitle: row.subtitle,
        content: row.content,
        items: row.items || [],
        isPublished: row.is_published,
        displayOrder: row.display_order,
      }));
    }
  }

  const db = await readLocalDatabase();
  return db.aboutSections.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPublishedAboutSections(): Promise<AboutSectionItem[]> {
  const all = await getAboutSections();
  return all.filter((s) => s.isPublished);
}

export async function saveAboutSection(section: AboutSectionItem): Promise<void> {
  const db = await readLocalDatabase();
  const idx = db.aboutSections.findIndex((s) => s.id === section.id || s.sectionKey === section.sectionKey);
  if (idx >= 0) {
    db.aboutSections[idx] = section;
  } else {
    db.aboutSections.push(section);
  }
  await writeLocalDatabase(db);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch("about_sections", {
      method: "POST",
      prefer: "resolution=merge-duplicates",
      body: {
        id: section.id,
        section_key: section.sectionKey,
        title: section.title,
        subtitle: section.subtitle || "",
        content: section.content,
        items: section.items || [],
        is_published: section.isPublished,
        display_order: section.displayOrder,
      },
    });
  }
}

// ============================================================================
// TEAM MEMBERS
// ============================================================================

export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sb = await supabaseFetch<any[]>("team_members?select=*&order=display_order.asc");
    if (sb.ok && Array.isArray(sb.data) && sb.data.length > 0) {
      return sb.data.map((row) => ({
        id: row.id,
        name: row.full_name,
        role: row.role,
        bio: row.bio,
        image: row.image_url,
        socials: row.social_links || {},
        displayOrder: row.display_order,
        isPublished: row.is_published,
      }));
    }
  }

  const db = await readLocalDatabase();
  return db.teamMembers.sort((a, b) => a.displayOrder - b.displayOrder);
}

export async function getPublishedTeamMembers(): Promise<TeamMemberItem[]> {
  const all = await getTeamMembers();
  return all.filter((m) => m.isPublished);
}

export async function saveTeamMember(member: TeamMemberItem): Promise<void> {
  const db = await readLocalDatabase();
  const idx = db.teamMembers.findIndex((m) => m.id === member.id);
  if (idx >= 0) {
    db.teamMembers[idx] = member;
  } else {
    db.teamMembers.push(member);
  }
  await writeLocalDatabase(db);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch("team_members", {
      method: "POST",
      prefer: "resolution=merge-duplicates",
      body: {
        id: member.id,
        full_name: member.name,
        role: member.role,
        bio: member.bio,
        image_url: member.image,
        social_links: member.socials || {},
        display_order: member.displayOrder,
        is_published: member.isPublished,
      },
    });
  }
}

export async function deleteTeamMember(id: string): Promise<void> {
  const db = await readLocalDatabase();
  db.teamMembers = db.teamMembers.filter((m) => m.id !== id);
  await writeLocalDatabase(db);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch(`team_members?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }
}

// ============================================================================
// SERVICES
// ============================================================================

export async function getServices(): Promise<ServiceItem[]> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sb = await supabaseFetch<any[]>("services?select=*&order=display_order.asc");
    if (sb.ok && Array.isArray(sb.data) && sb.data.length > 0) {
      return sb.data.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        shortTitle: row.short_title,
        category: row.category,
        offeringStatus: row.offering_status,
        summary: row.short_description,
        description: row.full_description,
        problemSolved: row.problem_solved,
        deliverables: row.deliverables || [],
        workflow: row.workflow || [],
        image: row.image_url,
        iconName: row.icon,
        featured: row.is_featured,
        displayOrder: row.display_order,
        isPublished: row.is_published,
      }));
    }
  }

  const db = await readLocalDatabase();
  return db.services.map((s, i) => ({
    ...s,
    displayOrder: s.displayOrder ?? i + 1,
    isPublished: s.isPublished ?? true,
  }));
}

export async function getPublishedServices(): Promise<ServiceItem[]> {
  const all = await getServices();
  return all.filter((s) => s.isPublished !== false);
}

export async function saveService(service: ServiceItem): Promise<void> {
  const db = await readLocalDatabase();
  const idx = db.services.findIndex((s) => s.id === service.id || s.slug === service.slug);
  if (idx >= 0) {
    db.services[idx] = service;
  } else {
    db.services.push(service);
  }
  await writeLocalDatabase(db);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch("services", {
      method: "POST",
      prefer: "resolution=merge-duplicates",
      body: {
        id: service.id,
        slug: service.slug,
        title: service.title,
        short_title: service.shortTitle || service.title,
        category: service.category,
        offering_status: service.offeringStatus,
        short_description: service.summary,
        full_description: service.description,
        problem_solved: service.problemSolved || "",
        deliverables: service.deliverables || [],
        icon: service.iconName || "Sparkles",
        image_url: service.image,
        is_featured: service.featured,
        display_order: service.displayOrder || 0,
        is_published: service.isPublished ?? true,
      },
    });
  }
}

export async function deleteService(id: string): Promise<void> {
  const db = await readLocalDatabase();
  db.services = db.services.filter((s) => s.id !== id);
  await writeLocalDatabase(db);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch(`services?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }
}

// ============================================================================
// PORTFOLIO PROJECTS
// ============================================================================

export async function getProjects(): Promise<ProjectItem[]> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sb = await supabaseFetch<any[]>("portfolio_projects?select=*&order=display_order.asc");
    if (sb.ok && Array.isArray(sb.data) && sb.data.length > 0) {
      return sb.data.map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        clientOrIndustry: row.client_name,
        category: row.category,
        tags: row.tags || [],
        summary: row.short_description,
        challenge: row.challenge,
        solution: row.solution,
        thumbnail: row.cover_image,
        thumbnailAlt: row.thumbnail_alt || row.title,
        gallery: (row.gallery_images || [row.cover_image]).map((img: string) => ({
          src: img,
          caption: row.title,
        })),
        deliverables: row.services_delivered || [],
        externalUrl: row.project_url,
        completedYear: row.completion_date,
        featured: row.is_featured,
        displayOrder: row.display_order,
        isPublished: row.is_published,
      }));
    }
  }

  const db = await readLocalDatabase();
  return db.projects.map((p, i) => ({
    ...p,
    displayOrder: p.displayOrder ?? i + 1,
    isPublished: p.isPublished ?? true,
  }));
}

export async function getPublishedProjects(): Promise<ProjectItem[]> {
  const all = await getProjects();
  return all.filter((p) => p.isPublished !== false);
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  const all = await getPublishedProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function saveProject(project: ProjectItem): Promise<void> {
  const db = await readLocalDatabase();
  const idx = db.projects.findIndex((p) => p.id === project.id || p.slug === project.slug);
  if (idx >= 0) {
    db.projects[idx] = project;
  } else {
    db.projects.push(project);
  }
  await writeLocalDatabase(db);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch("portfolio_projects", {
      method: "POST",
      prefer: "resolution=merge-duplicates",
      body: {
        id: project.id,
        slug: project.slug,
        title: project.title,
        client_name: project.clientOrIndustry,
        category: project.category,
        short_description: project.summary,
        challenge: project.challenge || "",
        solution: project.solution || "",
        cover_image: project.thumbnail,
        gallery_images: project.gallery?.map((g) => g.src) || [project.thumbnail],
        services_delivered: project.deliverables || [],
        project_url: project.externalUrl || "",
        completion_date: project.completedYear || "2026",
        is_featured: project.featured,
        display_order: project.displayOrder || 0,
        is_published: project.isPublished ?? true,
      },
    });
  }
}

export async function deleteProject(id: string): Promise<void> {
  const db = await readLocalDatabase();
  db.projects = db.projects.filter((p) => p.id !== id);
  await writeLocalDatabase(db);

  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    await supabaseFetch(`portfolio_projects?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  }
}

// ============================================================================
// CONTACT SUBMISSIONS (ENQUIRIES)
// ============================================================================

export async function getContactSubmissions(): Promise<{
  submissions: ContactSubmission[];
  storageMode: "supabase" | "local_hybrid";
}> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sb = await supabaseFetch<any[]>("contact_submissions?select=*&order=created_at.desc");
    if (sb.ok && Array.isArray(sb.data)) {
      return {
        storageMode: "supabase",
        submissions: sb.data.map((row) => ({
          id: row.id,
          referenceId: row.id.slice(0, 8).toUpperCase(),
          fullName: row.full_name,
          email: row.email,
          phone: row.phone || "",
          company: row.company || "",
          serviceInterest: row.service_interest,
          subject: row.subject || "",
          message: row.message,
          budget: row.budget || "",
          preferredContact: row.preferred_contact,
          status: row.status,
          isRead: row.is_read,
          notes: row.notes || "",
          createdAt: row.created_at,
        })),
      };
    }
  }

  // Fallback to local store
  try {
    const raw = await fs.readFile(CONTACT_STORE_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const normalized: ContactSubmission[] = parsed
        .map((item, idx) => ({
          id: item.id || `local-${idx}`,
          referenceId: item.referenceId || `ENQ-${idx}`,
          fullName: item.fullName,
          email: item.email,
          phone: item.phone || "",
          company: item.company || "",
          serviceInterest: item.service || item.serviceInterest,
          subject: item.subject || "",
          message: item.description || item.message,
          budget: item.budget || "",
          preferredContact: item.preferredContact || "email",
          status: (item.status === "in_review" ? "in_progress" : item.status === "archived" ? "closed" : item.status) || "new",
          isRead: item.isRead ?? false,
          notes: item.notes || "",
          createdAt: item.submittedAt || item.createdAt || new Date().toISOString(),
        }))
        .reverse();
      return { submissions: normalized, storageMode: "local_hybrid" };
    }
  } catch {
    // Empty
  }

  return { submissions: [], storageMode: "local_hybrid" };
}

export async function updateContactSubmissionStatus(
  id: string,
  status: ContactSubmissionStatus,
  isRead?: boolean,
  notes?: string
): Promise<boolean> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sb = await supabaseFetch(`contact_submissions?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: {
        status,
        ...(isRead !== undefined ? { is_read: isRead } : {}),
        ...(notes !== undefined ? { notes } : {}),
      },
    });
    if (sb.ok) return true;
  }

  try {
    const raw = await fs.readFile(CONTACT_STORE_FILE, "utf8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      const updated = list.map((item) =>
        item.id === id || item.referenceId === id
          ? {
              ...item,
              status,
              ...(isRead !== undefined ? { isRead } : {}),
              ...(notes !== undefined ? { notes } : {}),
            }
          : item
      );
      await fs.writeFile(CONTACT_STORE_FILE, JSON.stringify(updated, null, 2), "utf8");
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export async function deleteContactSubmission(id: string): Promise<boolean> {
  const creds = await getSupabaseCredentials();
  if (creds.source !== "unconfigured") {
    const sb = await supabaseFetch(`contact_submissions?id=eq.${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (sb.ok) return true;
  }

  try {
    const raw = await fs.readFile(CONTACT_STORE_FILE, "utf8");
    const list = JSON.parse(raw);
    if (Array.isArray(list)) {
      const filtered = list.filter((item) => item.id !== id && item.referenceId !== id);
      await fs.writeFile(CONTACT_STORE_FILE, JSON.stringify(filtered, null, 2), "utf8");
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

// Backward compatibility helper
export const getAllEnquiries = getContactSubmissions;
export const updateEnquiryStatus = (ref: string, status: any, notes?: string) =>
  updateContactSubmissionStatus(ref, status, undefined, notes);
export const deleteEnquiryByReference = deleteContactSubmission;
export const getManagedProjects = getProjects;
export const addManagedProject = (p: any) => saveProject(p);
export const deleteManagedProject = deleteProject;
export const getManagedServices = getServices;
export const updateManagedService = (id: string, updates: any) => {
  return saveService({ id, ...updates } as any);
};

// ============================================================================
// DASHBOARD OVERVIEW METRICS
// ============================================================================

export async function getDashboardMetrics(): Promise<{
  publishedProjectsCount: number;
  activeServicesCount: number;
  teamMembersCount: number;
  totalSubmissionsCount: number;
  unreadSubmissionsCount: number;
  isSupabaseConnected: boolean;
  supabaseSource: string;
}> {
  const [projects, services, team, { submissions, storageMode }] = await Promise.all([
    getPublishedProjects(),
    getPublishedServices(),
    getPublishedTeamMembers(),
    getContactSubmissions(),
  ]);

  const creds = await getSupabaseCredentials();

  return {
    publishedProjectsCount: projects.length,
    activeServicesCount: services.length,
    teamMembersCount: team.length,
    totalSubmissionsCount: submissions.length,
    unreadSubmissionsCount: submissions.filter((s) => !s.isRead).length,
    isSupabaseConnected: creds.source !== "unconfigured",
    supabaseSource: creds.source,
  };
}
