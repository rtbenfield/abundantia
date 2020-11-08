import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase/app";
import * as React from "react";

interface EmailPasswordProps {
  open: boolean;
  onForgotPassword(): void;
  onRegister(): void;
}

const EmailPassword: React.FC<EmailPasswordProps> = ({
  onForgotPassword,
  onRegister,
  open,
}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<firebase.FirebaseError | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e);
      setPending(false);
    }
  }

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {error && <Alert severity="error">{error.message}</Alert>}
          <TextField
            fullWidth
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            value={email}
          />
          <TextField
            fullWidth
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            value={password}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            disabled={pending}
            onClick={onForgotPassword}
            variant="text"
          >
            Forgot Password
          </Button>
          <Button
            color="primary"
            disabled={pending}
            onClick={onRegister}
            variant="text"
          >
            Create User
          </Button>
          <Button
            color="primary"
            disabled={pending}
            type="submit"
            variant="contained"
          >
            Sign in
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmailPassword;
