import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import firebase from "firebase/app";
import * as React from "react";

interface RegisterProps {
  open: boolean;
  onCancel(): void;
}

const Register: React.FC<RegisterProps> = ({ onCancel, open }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<firebase.FirebaseError | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      onCancel();
    } catch (e) {
      setError(e);
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {error && !pending && <Alert severity="error">{error.message}</Alert>}
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
            color="secondary"
            disabled={pending}
            onClick={onCancel}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={pending}
            type="submit"
            variant="contained"
          >
            Create User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Register;
