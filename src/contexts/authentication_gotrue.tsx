import GoTrue, { User } from "gotrue-js";
import * as React from "react";

const auth = new GoTrue({
  APIUrl: "https://abundantia.tylerbenfield.dev/.netlify/identity",
  audience: "",
  setCookie: false,
});

export interface AuthContext {
  user: User | null;
  login(email: string, password: string, remember?: boolean): Promise<User>;
  recover(token: string, remember?: boolean): Promise<User>;
  requestPasswordRecovery(email: string): Promise<void>;
  signOut(): Promise<void>;
  signup(email: string, password: string): Promise<User>;
}

const context = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const value: AuthContext = {
    async login(email, password, remember) {
      const u = await auth.login(email, password, remember);
      setUser(u);
      return u;
    },
    async recover(token, remember) {
      const u = await auth.recover(token, remember);
      setUser(u);
      return u;
    },
    async requestPasswordRecovery(email) {
      await auth.requestPasswordRecovery(email);
    },
    async signOut() {
      await auth.currentUser()?.logout();
      setUser(null);
    },
    async signup(email, password) {
      const u = await auth.signup(email, password);
      setUser(u);
      return u;
    },
    user,
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export function useAuth(): AuthContext {
  const value = React.useContext(context);
  if (!value) {
    throw new Error(`useAuth can only be used in a descendant of AuthProvider`);
  }
  return value;
}
