import { UserDataType } from "@/types/user";
import { create } from "zustand";

interface UserState {
  user: UserDataType | null;
  setUser: (user: UserDataType | null) => void;
  isUserLoading: boolean;
  setIsUserLoading: (data: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user: user })),
  isUserLoading: false,
  setIsUserLoading: (data) => set(() => ({ isUserLoading: data })),
}));
