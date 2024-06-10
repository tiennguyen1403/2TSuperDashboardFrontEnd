import { User } from "../Users/User.type";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskGroup;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  assignedFor: User;
}

export interface TaskDto {
  id?: string;
  title: string;
  description: string;
  isCompleted: boolean;
  status: any;
  assignedFor: any;
}

export interface TaskGroup {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface TaskGroupDto {
  id?: string;
  name: string;
  description?: string;
}

export enum ModalType {
  DEFAULT = "default",
  CREATE_TASK = "create_task",
  UPDATE_TASK = "update_task",
  CREATE_TASK_GROUP = "create_task_group",
  UPDATE_TASK_GROUP = "update_task_group",
}
