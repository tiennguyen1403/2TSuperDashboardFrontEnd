import { notification } from "antd";
import _ from "lodash";
import { axiosInstance } from "src/components/AxiosConfig";
import { ELoading } from "src/generalTypes";
import { Task, TaskDto } from "src/pages/Tasks/Task.type";
import { create } from "zustand";

type State = {
  tasks: Task[];
  totalItem: number;
  loading: ELoading[];
  fetchTasks: () => Promise<void>;
  createTask: (taskDto: TaskDto) => Promise<void>;
  updateTask: (id: Task["id"], taskDto: TaskDto) => Promise<void>;
  deleteTask: (id: Task["id"]) => Promise<void>;
};

const { FETCH, CREATE, UPDATE, DELETE } = ELoading;

const useTaskStore = create<State>((set) => ({
  tasks: [],
  totalItem: 0,
  loading: [],
  fetchTasks: async () => {
    set((state) => ({ ...state, loading: [...state.loading, FETCH] }));
    const res = await axiosInstance.get("/tasks");
    set((state) => ({
      ...state,
      tasks: res.data.items,
      totalItem: res.data.totalItem,
      loading: _.pull(state.loading, FETCH),
    }));
  },
  createTask: async (taskDto) => {
    set((state) => ({ ...state, loading: [...state.loading, CREATE] }));
    await axiosInstance.post("/tasks", taskDto);
    notification.success({ message: "Task was created successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, CREATE) }));
  },
  updateTask: async (id, taskDto) => {
    set((state) => ({ ...state, loading: [...state.loading, UPDATE] }));
    await axiosInstance.put(`/tasks/${id}`, { ...taskDto, id });
    notification.success({ message: "Task was updated successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, UPDATE) }));
  },
  deleteTask: async (id) => {
    set((state) => ({ ...state, loading: [...state.loading, DELETE] }));
    await axiosInstance.delete(`/tasks/${id}`);
    notification.success({ message: "Task was deleted successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, DELETE) }));
  },
}));

export default useTaskStore;
