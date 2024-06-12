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
  reorderTaskGroup: (newTaskGroups: TaskGroup[]) => Promise<void>;
};

const { FETCH, CREATE, UPDATE, DELETE } = ELoading;

const useTaskGroupStore = create<State>((set, get) => ({
  taskGroups: [],
  totalItem: 0,
  loading: [],
  fetchTaskGroups: async () => {
    try {
      set((state) => ({ ...state, loading: [...state.loading, FETCH] }));
      const res = await axiosInstance.get("/task-group");
      set((state) => ({
        ...state,
        taskGroups: _.orderBy(res.data.items, ["order"], ["asc"]),
        totalItem: res.data.totalItem,
        loading: _.pull(state.loading, FETCH),
      }));
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
  createTaskGroup: async (taskGroupDto) => {
    try {
      set((state) => ({ ...state, loading: [...state.loading, CREATE] }));
      await axiosInstance.post("/task-group", taskGroupDto);
      set((state) => ({ ...state, loading: _.pull(state.loading, CREATE) }));
      get().fetchTaskGroups();
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
  updateTaskGroup: async (taskGroupDto) => {
    try {
      set((state) => ({ ...state, loading: [...state.loading, UPDATE] }));
      await axiosInstance.put(`/task-group/${taskGroupDto.id}`, taskGroupDto);
      set((state) => ({ ...state, loading: _.pull(state.loading, UPDATE) }));
      get().fetchTaskGroups();
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
  deleteTaskGroup: async (id) => {
    try {
      set((state) => ({ ...state, loading: [...state.loading, DELETE] }));
      await axiosInstance.delete(`/task-group/${id}`);
      notification.success({ message: "Task Group was deleted successfully!" });
      set((state) => ({ ...state, loading: _.pull(state.loading, DELETE) }));
      get().fetchTaskGroups();
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
  reorderTaskGroup: async (newTaskGroups) => {
    try {
      set((state) => ({ ...state, loading: [...state.loading, UPDATE] }));
      const payload = { newTaskGroups };
      await axiosInstance.patch("/task-group/reorder", payload);
      set((state) => ({ ...state, loading: _.pull(state.loading, UPDATE) }));
      get().fetchTaskGroups();
    } catch (error) {
      console.log("error :>> ", error);
    }
  },
}));

export default useTaskGroupStore;
