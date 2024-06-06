import { SelectProps } from "antd";
import { ProjectDto, ProjectStatus } from "./Project.type";

export const initialValues: ProjectDto = {
  id: undefined,
  name: "",
  isActive: true,
  description: "",
  projectImage: null,
  projectCover: null,
  startDate: null,
  endDate: null,
  status: ProjectStatus.NOT_STARTED,
};

export const projectStatusOptions: SelectProps["options"] = [
  {
    label: "Not Started",
    value: ProjectStatus.NOT_STARTED,
  },
  {
    label: "In Progress",
    value: ProjectStatus.IN_PROGRESS,
  },
  {
    label: "On Hold",
    value: ProjectStatus.ON_HOLD,
  },
  {
    label: "Completed",
    value: ProjectStatus.COMPLETED,
  },
  {
    label: "Cancelled",
    value: ProjectStatus.CANCELLED,
  },
  {
    label: "Delayed",
    value: ProjectStatus.DELAYED,
  },
  {
    label: "Under Review",
    value: ProjectStatus.UNDER_REVIEW,
  },
  {
    label: "Planning",
    value: ProjectStatus.PLANNING,
  },
  {
    label: "Testing",
    value: ProjectStatus.TESTING,
  },
  {
    label: "Deployed",
    value: ProjectStatus.DEPLOYED,
  },
];
