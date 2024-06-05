import { ProjectDto, ProjectStatus } from "./Project.type";

export const initialValues: ProjectDto = {
  id: undefined,
  name: "",
  isActive: true,
  description: "",
  projectImage: "",
  projectCover: "",
  startDate: "",
  endDate: "",
  status: ProjectStatus.NOT_STARTED,
};
