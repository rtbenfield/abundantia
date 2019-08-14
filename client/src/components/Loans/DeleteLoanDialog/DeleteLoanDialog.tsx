import * as React from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from "@material-ui/core";
import useLoans from "../../../hooks/useLoans";

interface DeleteLoanDialogProps {
  loanId: string;
  open: boolean;
  onClose(): void;
  onLoanDeleted(): void;
}

const DeleteLoanDialog: React.FunctionComponent<DeleteLoanDialogProps> = ({ loanId, onClose, onLoanDeleted, open }) => {
  const { deleteLoan, loans } = useLoans();
  const loanInfo = loans.find(x => x.id === loanId);

  async function handleConfirm() {
    await deleteLoan(loanId);
    onLoanDeleted();
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
