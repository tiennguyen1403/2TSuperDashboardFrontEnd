import { create } from "zustand";
import { ELoading } from "src/helpers/constants";
import { Project, ProjectDto } from "src/pages/Projects/Project.type";
import { axiosInstance } from "src/components/AxiosConfig";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { createBucket, deleteBucket, uploadImage } from "src/helpers/utilities";
import dayjs from "dayjs";
import { notification } from "antd";

type State = {
  projects: Project[];
  totalItems: number;
  loadingStates: ELoading[];
  fetchProjects: () => Promise<void>;
  createProject: (projectDto: ProjectDto) => Promise<void>;
  deleteProject: (id: Project["id"]) => Promise<void>;
};

const { FETCH, CREATE, DELETE } = ELoading;

const useProjectStore = create<State>((set, get) => ({
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
  createProject: async (projectDto) => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, CREATE] }));
      let projectImage = "";
      let projectCover = "";
      const id = uuidv4();
      await createBucket(id);
      if (projectDto.projectImage?.length) {
        projectImage = await uploadImage(id, projectDto.projectImage[0]);
      }
      if (projectDto.projectCover?.length) {
        projectCover = await uploadImage(id, projectDto.projectCover[0]);
      }
      const startDate = projectDto.startDate
        ? dayjs(projectDto.startDate).startOf("day").toISOString()
        : null;
      const endDate = projectDto.endDate
        ? dayjs(projectDto.endDate).endOf("day").toISOString()
        : null;
      const payload = { ...projectDto, id, startDate, endDate, projectImage, projectCover };
      await axiosInstance.post("/projects", payload);
      notification.success({ message: "Project created successfully!" });
      get().fetchProjects();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, CREATE) }));
    }
  },
  deleteProject: async (id) => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, DELETE] }));

      await deleteBucket(id);
      await axiosInstance.delete(`/projects/${id}`);
      notification.success({ message: "Project deleted successfully!" });

      get().fetchProjects();
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, DELETE) }));
    }
  },
}));

export default useProjectStore;
