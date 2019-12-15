import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";
import { useSnackbar } from "notistack";
import * as React from "react";
import useLoans from "../../../hooks/useLoans";
import { useErrorHandler } from "../../ErrorHandler";

interface DeleteLoanDialogProps {
  loanId: string;
  open: boolean;
  onClose(): void;
  onLoanDeleted(): void;
}

const DeleteLoanDialog: React.FunctionComponent<DeleteLoanDialogProps> = ({ loanId, onClose, onLoanDeleted, open }) => {
  const { captureError } = useErrorHandler();
  const { deleteLoan, error, isLoading, loans } = useLoans();
  const { enqueueSnackbar } = useSnackbar();

  if (error) {
    throw error;
  } else if (isLoading) {
    return null;
  }

  const loanInfo = loans.find(x => x.id === loanId);
  if (!loanInfo) {
    throw new Error(`Loan ${loanId} not found`);
  }

  async function handleConfirm() {
    try {
      onLoanDeleted();
      await deleteLoan(loanId);
      enqueueSnackbar(`${loanInfo?.name ?? "Loan"} deleted`, {
        variant: "success",
      });
    } catch (err) {
      captureError(err);
      enqueueSnackbar(`Error deleting ${loanInfo?.name ?? "loan"}`, { variant: "error" });
    }
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Delete {loanInfo ? loanInfo.name : "loan"}?</DialogTitle>
      <DialogContent>
        <DialogContentText>This will also delete the scenarios and payments associated to this loan.</DialogContentText>
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
