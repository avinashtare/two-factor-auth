import type { UserContextType } from "@/types/user.types";
import { useContext } from "react";
import { createContext } from "react";

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

export default useUserContext;
