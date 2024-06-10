import _ from "lodash";
import { create } from "zustand";
import { ELoading } from "src/generalTypes";
import { TaskGroup, TaskGroupDto } from "src/pages/Tasks/Task.type";
import { axiosInstance } from "src/components/AxiosConfig";
import { notification } from "antd";

type State = {
  taskGroups: TaskGroup[];
  totalItem: number;
  loading: ELoading[];
  fetchTaskGroups: () => Promise<void>;
  createTaskGroup: (taskGroupDto: TaskGroupDto) => Promise<void>;
  updateTaskGroup: (taskGroupDto: TaskGroupDto, showAlert?: boolean) => Promise<void>;
  deleteTaskGroup: (id: string) => Promise<void>;
};

const { FETCH, CREATE, UPDATE, DELETE } = ELoading;

const useTaskGroupStore = create<State>((set, get) => ({
  taskGroups: [],
  totalItem: 0,
  loading: [],
  fetchTaskGroups: async () => {
    set((state) => ({ ...state, loading: [...state.loading, FETCH] }));
    const res = await axiosInstance.get("/task-group");
    set((state) => ({
      ...state,
      taskGroups: res.data.items,
      totalItem: res.data.totalItem,
      loading: _.pull(state.loading, FETCH),
    }));
  },
  createTaskGroup: async (taskGroupDto) => {
    set((state) => ({ ...state, loading: [...state.loading, CREATE] }));
    await axiosInstance.post("/task-group", taskGroupDto);
    notification.success({ message: "Task Group was created successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, CREATE) }));
    get().fetchTaskGroups();
  },
  updateTaskGroup: async (taskGroupDto, showAlert = false) => {
    set((state) => ({ ...state, loading: [...state.loading, UPDATE] }));
    await axiosInstance.put(`/task-group/${taskGroupDto.id}`, taskGroupDto);
    showAlert && notification.success({ message: "Task Group was updated successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, UPDATE) }));
    get().fetchTaskGroups();
  },
  deleteTaskGroup: async (id) => {
    set((state) => ({ ...state, loading: [...state.loading, DELETE] }));
    await axiosInstance.delete(`/task-group/${id}`);
    notification.success({ message: "Task Group was deleted successfully!" });
    set((state) => ({ ...state, loading: _.pull(state.loading, DELETE) }));
    get().fetchTaskGroups();
  },
}));

export default useTaskGroupStore;
