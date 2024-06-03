import { create } from "zustand";
import { axiosInstance } from "../components/AxiosConfig";
import { User, UserDto } from "src/pages/Users/User.type";
import { notification } from "antd";
import { ELoading } from "src/helpers/constants";
import _ from "lodash";

type State = {
  users: any;
  loadingStates: ELoading[];
  fetchUsers: () => Promise<void>;
  fetchUserDetail: (uid: string) => Promise<User>;
  addUser: (userDto: UserDto) => Promise<void>;
  updateUser: (userDto: UserDto) => Promise<void>;
  deleteUser: (uid: string) => Promise<void>;
};

const { FETCH, CREATE, UPDATE, DELETE } = ELoading;

const useUsersStore = create<State>((set) => ({
  users: [],
  loadingStates: [],

  fetchUsers: async () => {
    try {
      set((state) => ({ ...state, loadingStates: [...state.loadingStates, FETCH] }));
      const res = await axiosInstance.get("/users");
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
      const res = await axiosInstance.get("/users");
      set((state) => ({ ...state, users: res.data }));
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
      await axiosInstance.put(`/users/${userDto.id}`, userDto);
      notification.success({ message: "User updated successfully!" });
      const res = await axiosInstance.get("/users");
      set((state) => ({ ...state, users: res.data }));
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
      await axiosInstance.delete(`/users/${uid}`);
      notification.success({ message: "User deleted successfully!" });
      const res = await axiosInstance.get("/users");
      set((state) => ({ ...state, users: res.data }));
      return Promise.resolve();
    } catch (error: any) {
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loadingStates: _.pull(state.loadingStates, DELETE) }));
    }
  },
}));

export default useUsersStore;
