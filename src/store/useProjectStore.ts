import { create } from "zustand";
import { Project, ProjectDto } from "src/pages/Projects/Project.type";
import { axiosInstance } from "src/components/AxiosConfig";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import {
  convertDayToString,
  createBucket,
  deleteBucket,
  updateImage,
  uploadImage,
} from "src/helpers/utilities";
import dayjs from "dayjs";
import { notification } from "antd";
import { ELoading } from "src/generalTypes";

type State = {
  projects: Project[];
  totalItems: number;
  loadingStates: ELoading[];
  fetchProjects: () => Promise<void>;
  createProject: (projectDto: ProjectDto) => Promise<void>;
  updateProject: (
    id: ProjectDto["id"],
    projectDto: ProjectDto,
    prevProject: ProjectDto
  ) => Promise<void>;
  deleteProject: (id: Project["id"]) => Promise<void>;
};

const { FETCH, CREATE, UPDATE, DELETE } = ELoading;

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
  updateProject: async (id, projectDto, prevProject) => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, UPDATE] }));
      const projectImage = await updateImage(projectDto.projectImage, prevProject, "projectImage");
      const projectCover = await updateImage(projectDto.projectCover, prevProject, "projectCover");
      const startDate = convertDayToString(projectDto.startDate, "start");
      const endDate = convertDayToString(projectDto.endDate, "end");
      const payload = { ...projectDto, id, startDate, endDate, projectImage, projectCover };
      await axiosInstance.put(`/projects/${id}`, payload);
      notification.success({ message: "Project updated successfully!" });
      get().fetchProjects();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, UPDATE) }));
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
