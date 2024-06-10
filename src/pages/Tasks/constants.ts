import { TaskDto, TaskGroupDto } from "./Task.type";

export const initialValues: TaskDto = {
  id: undefined,
  title: "",
  description: "",
  status: null,
  assignedFor: null,
  isCompleted: false,
};

export const initialTaskGroup: TaskGroupDto = {
  id: undefined,
  name: "",
  description: "",
};
