import { createContext, ReactNode, useContext, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";

interface SigninForm {
  username: string;
  password: string;
  email?: string;
}
interface SignupForm {
  username: string;
  password: string;
  email: string;
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  // existence of token means the logged in state, so bootstrap it
  if (token) {
    const data = await http({ endpoint: "users/me", token });
    user = data.user;
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
  const [user, setUser] = useState<User | null>(null); // if not specifying a generic type, useState engenders the 'user' the type that it deducted from the initial state
  const login = (form: SigninForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: SignupForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));

  useMount(() => {
    bootstrapUser().then(setUser);
  });
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
