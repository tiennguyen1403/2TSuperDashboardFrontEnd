import { create } from "zustand";
import { axiosInstance } from "../components/AxiosConfig";
import { User, UserDto } from "src/pages/Users/User.type";
import { notification } from "antd";
import _ from "lodash";
import { ELoading, ListResponse, Pagination } from "src/generalTypes";
import { deleteBucket } from "src/helpers/utilities";

type State = {
  users: any;
  loadingStates: ELoading[];
  fetchUsers: (pagination: Pagination) => Promise<ListResponse<User>>;
  fetchUserDetail: (uid: string) => Promise<User>;
  addUser: (userDto: UserDto) => Promise<void>;
  updateUser: (userDto: UserDto) => Promise<void>;
  deleteUser: (uid: string) => Promise<void>;
};

const { FETCH, CREATE, UPDATE, DELETE } = ELoading;

const useUsersStore = create<State>((set, get) => ({
  users: [],
  loadingStates: [],

  fetchUsers: async (pagination: Pagination) => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, FETCH] }));
      const { page, size } = pagination;
      const res = await axiosInstance.get(`/users?page=${page}&size=${size}`);
      set((state) => ({ ...state, users: res.data }));
      return Promise.resolve(res.data);
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, FETCH) }));
    }
  },
  fetchUserDetail: async (uid) => {
    try {
      const res = await axiosInstance.get(`/users/${uid}`);
      return Promise.resolve(res.data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  addUser: async (userDto) => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, CREATE] }));
      await axiosInstance.post("/users", userDto);
      notification.success({ message: "User created successfully!" });
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, CREATE) }));
    }
  },
  updateUser: async (userDto) => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, UPDATE] }));
      const password = _.isEmpty(userDto.password) ? null : userDto.password;
      await axiosInstance.put(`/users/${userDto.id}`, { ...userDto, password });
      notification.success({ message: "User was updated successfully!" });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, UPDATE) }));
    }
  },
  deleteUser: async (uid) => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, DELETE] }));

      await deleteBucket(uid);
      await axiosInstance.delete(`/users/${uid}`);
      notification.success({ message: "User deleted successfully!" });

      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, DELETE) }));
    }
  },
}));

export default useUsersStore;
