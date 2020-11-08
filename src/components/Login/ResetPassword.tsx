import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import * as React from "react";
import { useAuth } from "../../contexts/authentication";

interface EmailPasswordProps {
  onCancel(): void;
  open: boolean;
}

const EmailPassword: React.FC<EmailPasswordProps> = ({ onCancel, open }) => {
  const auth = useAuth();
  const [email, setEmail] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [error, setError] = React.useState<firebase.FirebaseError | null>(null);
  const [sent, setSent] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      await auth.requestPasswordRecovery(email);
      setSent(true);
    } catch (e) {
      setError(e);
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Reset Password</DialogTitle>
        {!sent && (
          <>
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
            </DialogContent>
          </>
        )}
        {sent && (
          <DialogContent>
            <Alert severity="success">
              Password reset email sent to {email}
            </Alert>
          </DialogContent>
        )}
      </form>
    </Dialog>
  );
};

export default EmailPassword;
