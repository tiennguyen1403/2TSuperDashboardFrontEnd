import { create } from "zustand";
import { ELoading } from "src/helpers/constants";
import { Project } from "src/pages/Projects/Project.type";
import { axiosInstance } from "src/components/AxiosConfig";
import _ from "lodash";

type State = {
  projects: Project[];
  totalItems: number;
  loadingStates: ELoading[];
  fetchProjects: () => Promise<void>;
};

const { FETCH } = ELoading;

const useProjectStore = create<State>((set) => ({
  projects: [],
  totalItems: 0,
  loadingStates: [],
  fetchProjects: async () => {
    set((state) => ({ ...state, loadingStates: [...state.loadingStates, FETCH] }));
    const res = await axiosInstance.get("/projects");
    set((state) => ({
      ...state,
      projects: res.data.items,
      totalItems: res.data.totalItems,
      loadingStates: _.pull(state.loadingStates, FETCH),
    }));
  },
}));

export default useProjectStore;
