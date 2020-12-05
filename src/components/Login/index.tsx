import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withProfiler } from "@sentry/react";
import * as React from "react";

const Login: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Dialog open>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>Click below to login</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={() => loginWithRedirect()}
          variant="contained"
        >
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withProfiler(Login, { name: "Login" });
