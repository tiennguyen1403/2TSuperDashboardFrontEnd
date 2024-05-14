import { create } from "zustand";
import { User } from "../pages/Users/User.type";
import { SignInDto } from "../pages/SignIn/SignIn.type";
import axios from "axios";
import { SignUpDto } from "../pages/SignUp/SignUp.type";
import _ from "lodash";

type State = {
  profile: User;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  error: string;
};

export const initialState: State = {
  profile: {} as User,
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: "",
};

const useAuthStore = create((set) => ({
  ...initialState,

  setAccessToken: (accessToken: string) => set((state: State) => ({ ...state, accessToken })),
  setRefreshToken: (refreshToken: string) => set((state: State) => ({ ...state, refreshToken })),
  signIn: async (signInDto: SignInDto) => {
    set((state: State) => ({ ...state, loading: true }));
    try {
      const url = "http://localhost:3333/auth/sign-in";
      const payload = signInDto;
      const res = await axios.post(url, payload);
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem("accessToken", accessToken);
      set((state: State) => ({ ...state, error: "", accessToken, refreshToken, profile: user }));
    } catch (error: any) {
      set((state: State) => ({ ...state, error: error.response.data.message }));
      return Promise.reject(error);
    } finally {
      set((state: State) => ({ ...state, loading: false }));
    }
  },
  signUp: async (signUpDto: SignUpDto) => {
    set((state: State) => ({ ...state, loading: true }));
    try {
      const url = "http://localhost:3333/auth/sign-up";
      const payload = _.omit(signUpDto, ["confirmPassword", "isAgreeTermAndCondition"]);
      const res = await axios.post(url, payload);
      const { accessToken, refreshToken, user } = res.data;
      localStorage.setItem("accessToken", accessToken);
      set((state: State) => ({ ...state, error: "", accessToken, refreshToken, profile: user }));
    } catch (error: any) {
      set((state: State) => ({ ...state, error: error.response.data.message }));
      return Promise.reject(error);
    } finally {
      set((state: State) => ({ ...state, loading: false }));
    }
  },
  signOut: () => {
    set(() => initialState);
    localStorage.removeItem("accessToken");
  },
}));

export default useAuthStore;
