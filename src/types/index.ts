export type SectionId =
  | "home"
  | "about"
  | "instruments"
  | "projects"
  | "contact";

export type ProjectCategory = "opm" | "dev";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tag: string;
  year: string;
  span?: "wide" | "tall" | "default";
}

export interface ContactCommand {
  command: string;
  label: string;
  href: string;
}
