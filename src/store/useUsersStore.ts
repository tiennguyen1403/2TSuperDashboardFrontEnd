import { create } from "zustand";
import { SignInDto } from "../pages/SignIn/SignIn.type";
import { axiosInstance } from "../components/AxiosConfig";
import { UserDto } from "src/pages/Users/User.type";
import { notification } from "antd";

type State = {
  users: any;
  loading: boolean;
  error: string;
  fetchUsers: () => void;
  addUser: (userDto: UserDto) => void;
  updateUser: (user: SignInDto) => void;
  deleteUser: (uid: string) => void;
};

const useUsersStore = create<State>((set) => ({
  users: [],
  loading: true,
  error: "",

  fetchUsers: async () => {
    try {
      set((state) => ({ ...state, loading: true }));
      const res = await axiosInstance.get("/users");
      set((state) => ({ ...state, error: "", users: res.data }));
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }));
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },

  addUser: async (userDto: UserDto) => {
    try {
      set((state) => ({ ...state, loading: true }));
      await axiosInstance.post("/users", userDto);
      notification.success({ message: "User created successfully!" });
      const res = await axiosInstance.get("/users");
      set((state) => ({ ...state, error: "", users: res.data }));
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }));
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
  updateUser: async (user: SignInDto) => {},
  deleteUser: async (uid: string) => {
    try {
      set((state) => ({ ...state, loading: true }));
      await axiosInstance.delete(`/users/${uid}`);
      notification.success({ message: "User deleted successfully!" });
      const res = await axiosInstance.get("/users");
      set((state) => ({ ...state, error: "", users: res.data }));
    } catch (error: any) {
      set((state) => ({ ...state, error: error.message }));
      return Promise.reject(error);
    } finally {
      set((state) => ({ ...state, loading: false }));
    }
  },
}));

export default useUsersStore;
