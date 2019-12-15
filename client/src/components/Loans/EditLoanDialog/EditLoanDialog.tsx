import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import { useSnackbar } from "notistack";
import * as React from "react";
import useLoan from "../../../hooks/useLoan";
import { useErrorHandler } from "../../ErrorHandler";
import LoanForm, { useLoanForm } from "../LoanForm";

interface EditLoanDialogProps {
  loanId: string;
  open: boolean;
  onClose(): void;
}

const EditLoanDialog: React.FunctionComponent<EditLoanDialogProps> = ({ loanId, onClose, open }) => {
  const { captureError } = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading, loan, updateLoan } = useLoan(loanId);
  const loanForm = useLoanForm(loan);
  const { getLoan, hasErrors, reset } = loanForm;

  async function handleSubmit() {
    const loanUpdate = getLoan();
    try {
      await updateLoan(loanUpdate);
      onClose();
      enqueueSnackbar(`${loanUpdate.name ?? "Loan"} updated`, {
        variant: "info",
      });
    } catch (err) {
      captureError(err);
      enqueueSnackbar(`Error updating ${loanUpdate.name}`, { variant: "error" });
    }
  }

  return (
    <Dialog maxWidth="xs" onClose={onClose} open={open} onExited={reset}>
      <DialogTitle>Edit Loan</DialogTitle>
      {!isLoading && (
        <DialogContent>
          <LoanForm loanForm={loanForm} />
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="primary" disabled={hasErrors} onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditLoanDialog;
