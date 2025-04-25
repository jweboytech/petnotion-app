import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UserState {
  id: string;
  name: string;
  token: string;
  email: string;
  avatar: string;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  immer((set) => ({
    id: "",
    name: "",
    token: "",
    email: "",
    avatar: "",
    setUser: (payload) =>
      set((state) => {
        if (payload != null) {
          state.id = payload.id!;
          state.name = payload.name!;
          state.avatar = payload.avatar!;
          state.email = payload.email!;
          state.token = payload.token!;
        }
      }),
    clearUser: () =>
      set((state) => {
        state.id = "";
        state.name = "";
        state.token = "";
      }),
  }))
);
