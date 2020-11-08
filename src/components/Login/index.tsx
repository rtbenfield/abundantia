import * as React from "react";

// const Login: React.FC = () => {
//   const [mode, setMode] = React.useState<"email" | "reset" | "register">(
//     "email",
//   );

//   return (
//     <>
//       <EmailPassword
//         onForgotPassword={() => setMode("reset")}
//         onRegister={() => setMode("register")}
//         open={mode === "email"}
//       />
//       <Register onCancel={() => setMode("email")} open={mode === "register"} />
//       <ResetPassword
//         onCancel={() => setMode("email")}
//         open={mode === "reset"}
//       />
//     </>
//   );
// };
declare class Keycloak {
  constructor(options: any);
  public init(): Promise<boolean>;
  public login(options?: any): void;
  public logout(options?: any): void;
}

const keycloak = new Keycloak({
  url: "http://localhost:8079/auth/",
  realm: "abundantia",
  clientId: "abundantia-ui",
});

const Login: React.FC = () => {
  React.useEffect(() => {
    async function checkAuthentication(_: AbortSignal): Promise<void> {
      const value = await keycloak.init();
      if (!value) {
        keycloak.login();
      }
    }

    const controller = new AbortController();
    checkAuthentication(controller.signal);
    return () => controller.abort();
  }, []);

  return null;
};

export default Login;
