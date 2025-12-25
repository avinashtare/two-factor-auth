import type { ReactNode } from "react";

export interface TUser {
  userId: string;
  name: string;
  email: string;
  twoFactorAuth: { activated: boolean };
  createdAt: Date; // ISO date string
}

export type UserContextType = {
  user: TUser | null;
  isLogin: boolean;
  setLogin: (t: boolean) => void;
  isLoading: boolean;
  fetchUser: () => void;
  isError: { error: boolean; message?: string };
};

export type UserProviderProps = {
  children: ReactNode;
};
