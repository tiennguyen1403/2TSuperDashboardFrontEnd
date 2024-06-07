import { User } from "../Users/User.type";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  assignedFor: User;
}

export interface TaskDto {
  title: string;
  status: TaskStatus;
  description: string;
  isCompleted: boolean;
}

export enum TaskStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}
