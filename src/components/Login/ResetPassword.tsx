import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import { auth } from "firebase/app";
import * as React from "react";

interface EmailPasswordProps {
  onCancel(): void;
  open: boolean;
}

const EmailPassword: React.FC<EmailPasswordProps> = ({ onCancel, open }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<firebase.FirebaseError | null>(null);
  const [sent, setSent] = React.useState(false);
  const [code, setCode] = React.useState("");

  async function handleSubmit() {
    setPending(true);
    if (!sent) {
      try {
        // TODO: Somehow this is kicking back to the login page, but the user gets the email
        await auth().sendPasswordResetEmail(email);
        setSent(true);
      } catch (e) {
        setError(e);
      } finally {
        setPending(false);
      }
    } else {
      try {
        await auth().confirmPasswordReset(code, password);
        await auth().signInWithEmailAndPassword(email, password);
      } catch (e) {
        setError(e);
        setPending(false);
      }
    }
  }

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Reset Password</DialogTitle>
        {!sent && (
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
          </DialogContent>
        )}
        {sent && (
          <DialogContent>
            <Alert severity="success">
              Password reset email sent to {email}
            </Alert>
            <TextField
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              fullWidth
              label="Code"
              onChange={(e) => setCode(e.target.value)}
              required
              type="text"
              value={code}
            />
            <TextField
              fullWidth
              label="New Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="text"
              value={password}
            />
          </DialogContent>
        )}
        <DialogActions>
          <Button
            color="primary"
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
            {!sent ? "Send" : "Submit"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EmailPassword;
