import * as Sentry from "@sentry/browser";
import * as React from "react";

export interface UserContext {
  isAuthenticated: boolean;
  connectionString?: string;
  user?: Readonly<UserInfo>;
  clearUser(): void;
  setUser(user: Readonly<UserInfo>): void;
}

export interface UserInfo {
  authToken: string;
  email: string;
  id: string;
  imageUrl?: string;
  name: string;
}

const userContext = React.createContext<Readonly<UserContext> | null>(null);
userContext.displayName = "UserContext";

export const UserProvider: React.FunctionComponent = ({ children }) => {
  const [user, setUser] = React.useState<Readonly<UserInfo> | undefined>();

  const value = React.useMemo<UserContext>(() => {
    return {
      clearUser: () => {
        setUser(undefined);
        Sentry.setUser(null);
        localStorage.removeItem("user");
      },
      connectionString: getConnectionString(user),
      isAuthenticated: !!user,
      setUser: user => {
        setUser(user);
        Sentry.setUser({
          email: user.email,
          id: user.id,
        });
        localStorage.setItem("user", JSON.stringify(user));
      },
      user,
    };
  }, [user]);

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

export function useUserContext(): Readonly<UserContext> {
  const value = React.useContext(userContext);
  if (!value) {
    throw new Error("useUserContext was called without a UserProvider");
  }
  return value;
}

function getConnectionString(user?: UserInfo): string | undefined {
  if (!user) {
    return undefined;
  } else {
    const tenant = user.email.replace(/[^a-zA-Z0-9]/g, "_");
    return `https://loan-rover-8d8400b445.herokuapp.com/${tenant}/dev`;
  }
}
