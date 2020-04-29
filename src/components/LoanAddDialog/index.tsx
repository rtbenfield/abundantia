import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useSnackbar } from "notistack";
import * as React from "react";
import { useErrorCapture } from "../../hooks/useErrorCapture";
import { useLoanActions } from "../../hooks/useLoans";
import LoanForm, { useLoanForm } from "../LoanForm";

interface AddLoanDialogProps {
  open: boolean;
  onClose(): void;
  onLoanAdded(id: string): void;
}

const AddLoanDialog: React.FC<AddLoanDialogProps> = ({
  onClose,
  onLoanAdded,
  open,
}) => {
  const { captureError } = useErrorCapture();
  const { enqueueSnackbar } = useSnackbar();
  const { createLoan } = useLoanActions();
  const loanForm = useLoanForm();
  const { getLoan, hasErrors, reset } = loanForm;

  async function handleSubmit() {
    const loanCreate = getLoan();
    try {
      const id = await createLoan(loanCreate);
      onLoanAdded(id);
      enqueueSnackbar(`${loanCreate.name} added`, { variant: "success" });
    } catch (err) {
      captureError(err);
      enqueueSnackbar(`Error adding ${loanCreate.name}`, { variant: "error" });
    }
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open} onExited={reset}>
      <DialogTitle>Add New Loan</DialogTitle>
      <DialogContent>
        <LoanForm loanForm={loanForm} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" disabled={hasErrors} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLoanDialog;
