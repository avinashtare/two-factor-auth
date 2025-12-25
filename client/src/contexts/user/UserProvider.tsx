import type {
  TUser,
  UserContextType,
  UserProviderProps,
} from "@/types/user.types";
import { UserContext } from "./UserContext";
import { useCallback, useState } from "react";
import { sendRequest } from "@/utils/api.utils";
import { API_ROUTES } from "@/const/api.const";
import { clearCookie, getCookie, setCookie } from "@/utils/cookie.utils";

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<UserContextType["user"]>(null);
  // not trusted work before server  using cookie flag activated
  const [isLogin, setLogin] = useState<UserContextType["isLogin"]>(
    getCookie("activated")?.toLocaleLowerCase() === "yes"
  );
  const [isLoading, setLoading] = useState<UserContextType["isLoading"]>(false);
  const [isError, setError] = useState<UserContextType["isError"]>({
    error: false,
  });

  const fetchUser = useCallback(async () => {
    if (!isLogin) return;

    setLoading(true);
    setError({ error: false });

    const user = (await sendRequest(
      API_ROUTES.USER.url,
      {},
      { method: API_ROUTES.USER.method, credentials: "include" }
    )) as { success: boolean; data: TUser; message: string };

    setLoading(false);

    // got user data
    if (user.success) {
      setUser(user.data);
      setLogin(true);
      setCookie("activated", "yes");
      setError({ error: false, message: "" });
    }
    // server message usre is unautorized
    else if (user.message.toLowerCase() === "unauthorized") {
      // user not valid
      clearCookie("activated");

      setLogin(false);
      setUser(null);
      setError({ error: true, message: user.message });
    }
    // other errors
    else {
      if (getCookie("activated")?.toLocaleLowerCase() !== "yes") {
        clearCookie("activated");
        setLogin(false);
      }

      setUser(null);
      setError({ error: true, message: user.message });
    }
  }, [isLogin]);

  return (
    <UserContext.Provider
      value={{ fetchUser, user, isLoading, isError, isLogin, setLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
