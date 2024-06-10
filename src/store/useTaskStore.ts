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
  fetchTasks: () => Promise<Task[]>;
  createTask: (taskDto: TaskDto) => Promise<void>;
  updateTask: (taskDto: TaskDto) => Promise<void>;
  deleteTask: (id: Task["id"]) => Promise<void>;
};

const { FETCH, CREATE, UPDATE, DELETE } = ELoading;

const useTaskStore = create<State>((set, get) => ({
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
    return Promise.resolve(res.data.items);
  },
  createTask: async (taskDto) => {
    set((state) => ({ ...state, loading: [...state.loading, CREATE] }));
    await axiosInstance.post("/tasks", taskDto);
    notification.success({ message: "Task was created successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, CREATE) }));
    get().fetchTasks();
  },
  updateTask: async (taskDto) => {
    set((state) => ({ ...state, loading: [...state.loading, UPDATE] }));
    await axiosInstance.put(`/tasks/${taskDto.id}`, taskDto);
    notification.success({ message: "Task was updated successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, UPDATE) }));
    get().fetchTasks();
  },
  deleteTask: async (id) => {
    set((state) => ({ ...state, loading: [...state.loading, DELETE] }));
    await axiosInstance.delete(`/tasks/${id}`);
    notification.success({ message: "Task was deleted successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, DELETE) }));
    get().fetchTasks();
  },
}));

export default useTaskStore;
