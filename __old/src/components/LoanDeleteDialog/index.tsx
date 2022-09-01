import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useHistory } from "react-router-dom";
import { useErrorCapture } from "../../hooks/useErrorCapture";
import { Loan, useLoanActions } from "../../hooks/useLoans";

interface DeleteLoanDialogProps {
  loan: Loan;
  open: boolean;
  onClose(): void;
}

const DeleteLoanDialog: React.FC<DeleteLoanDialogProps> = ({
  loan,
  onClose,
  open,
}) => {
  const history = useHistory();
  const { captureError } = useErrorCapture();
  const { deleteLoan } = useLoanActions();
  const { enqueueSnackbar } = useSnackbar();

  async function handleConfirm() {
    try {
      await deleteLoan(loan.id);
      history.push("/");
      enqueueSnackbar(`${loan.name} deleted`, {
        variant: "success",
      });
    } catch (err) {
      captureError(err);
      enqueueSnackbar(`Error deleting ${loan.name}`, { variant: "error" });
    }
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Delete {loan.name}?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will also delete the scenarios and payments associated to this
          loan.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" onClick={handleConfirm}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteLoanDialog;
