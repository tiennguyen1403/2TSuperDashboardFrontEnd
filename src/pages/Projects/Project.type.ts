export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  projectImage: string;
  projectCover: string;
  description: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDto {
  id?: string;
  name: string;
  status?: ProjectStatus;
  projectImage?: string | null;
  projectCover?: string | null;
  description?: string;
  startDate?: string | null;
  endDate?: string | null;
  isActive?: boolean;
}

export enum ProjectStatus {
  NOT_STARTED = "not_started",
  IN_PROGRESS = "in_progress",
  ON_HOLD = "on_hold",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  DELAYED = "delayed",
  UNDER_REVIEW = "under_review",
  PLANNING = "planning",
  TESTING = "testing",
  DEPLOYED = "deployed",
}
