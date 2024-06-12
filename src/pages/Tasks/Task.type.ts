import { User } from "../Users/User.type";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskGroup;
  createdAt: string;
  updatedAt: string;
  assignedFor: User;
}

export interface TaskDto {
  id?: string;
  title: string;
  description: string;
  status: any;
  assignedFor: any;
}

export interface TaskGroup {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

export interface TaskGroupDto {
  id?: string;
  name: string;
}
