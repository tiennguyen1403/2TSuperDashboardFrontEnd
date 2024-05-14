import axios from "axios";
import { create } from "zustand";
import { SignInDto } from "../pages/SignIn/SignIn.type";

type State = {
  users: any;
  loading: boolean;
  error: string;
};

const initialState: State = {
  users: [],
  loading: false,
  error: "",
};

const useUsersStore = create((set) => ({
  ...initialState,

  fetchUsers: async () => {
    set((state: State) => ({ ...state, loading: true }));
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      const users = res.data;
      set((state: State) => ({ ...state, error: "", users }));
    } catch (error: any) {
      set((state: State) => ({ ...state, error: error.message }));
    } finally {
      set((state: State) => ({ ...state, loading: false }));
    }
  },

  addUser: async (user: SignInDto) => {},
  updateUser: async (user: SignInDto) => {},
  deleteUser: async (id: string) => {},
}));

export default useUsersStore;
