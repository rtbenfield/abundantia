import * as React from "react";

declare class Keycloak {
  constructor(options: any);
  public init(): Promise<boolean>;
  public loadUserProfile(): Promise<any>;
  public login(options?: any): void;
  public logout(options?: any): void;
}

export interface User {
  readonly attributes: {};
  readonly email: string;
  readonly emailVerified: boolean;
  readonly firstName: string;
  readonly lastName: string;
  readonly username: string;
}

const keycloak = new Keycloak({
  url: "http://localhost:8079/auth/",
  realm: "abundantia",
  clientId: "abundantia-ui",
});
console.log(keycloak);

export interface AuthContext {
  user: User;
}

const context = React.createContext<AuthContext | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  React.useEffect(() => {
    async function checkAuthentication(_: AbortSignal): Promise<void> {
      const value = await keycloak.init();
      if (!value) {
        keycloak.login();
      } else {
        const u = await keycloak.loadUserProfile();
        console.log(u);
        setUser(u);
      }
    }

    const controller = new AbortController();
    checkAuthentication(controller.signal);
    return () => controller.abort();
  }, []);

  if (user) {
    const value: AuthContext = { user };
    return <context.Provider value={value}>{children}</context.Provider>;
  } else {
    return null;
  }
};

export function useAuth(): AuthContext {
  const value = React.useContext(context);
  if (!value) {
    throw new Error(`useAuth can only be used in a descendant of AuthProvider`);
  }
  return value;
}
