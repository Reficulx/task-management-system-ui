import { createContext, ReactNode, useContext, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/task-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";

interface SigninForm {
  username: string;
  password: string;
}
interface SignupForm {
  username: string;
  password: string;
  email: string;
}

const bootstrapUser = async () => {
  let user = null;
  const accessToken = auth.getToken();
  // existence of token means the logged in state, so bootstrap it
  if (accessToken) {
    const data = await http({ endpoint: "users/me", token: accessToken });
    // data = {id: string, username: string, email: string }
    user = { ...data, accessToken };
  }
  return user;
};

const AuthContext = createContext<
  | {
      user: User | null;
      register: (form: SignupForm) => Promise<void>;
      login: (form: SigninForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // const [user, setUser] = useState<User | null>(null); // if not specifying a generic type, useState engenders the 'user' the type that it deducted from the initial state
  const login = (form: SigninForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: SignupForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used in AuthProvider");
  }
  return context;
};
