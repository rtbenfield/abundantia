import * as React from "react";
import EmailPassword from "./EmailPassword";
import Register from "./Register";
import ResetPassword from "./ResetPassword";

const Login: React.FC = () => {
  const [mode, setMode] = React.useState<"email" | "reset" | "register">(
    "email",
  );

  return (
    <>
      <EmailPassword
        onForgotPassword={() => setMode("reset")}
        onRegister={() => setMode("register")}
        open={mode === "email"}
      />
      <Register onCancel={() => setMode("email")} open={mode === "register"} />
      <ResetPassword
        onCancel={() => setMode("email")}
        open={mode === "reset"}
      />
    </>
  );
};

export default Login;
