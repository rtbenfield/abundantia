import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";
import { useSnackbar } from "notistack";
import * as React from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import useLoans from "../../../hooks/useLoans";
import { useErrorHandler } from "../../ErrorHandler";
import LoanForm, { useLoanForm } from "../LoanForm";

interface AddLoanDialogProps {
  open: boolean;
  onClose(): void;
  onLoanAdded(loan: { id: string }): void;
}

const AddLoanDialog: React.FunctionComponent<AddLoanDialogProps> = ({ onClose, onLoanAdded, open }) => {
  useDocumentTitle("Add Loan");
  const { captureError } = useErrorHandler();
  const { enqueueSnackbar } = useSnackbar();
  const { createLoan } = useLoans();
  const loanForm = useLoanForm();
  const { getLoan, hasErrors, reset } = loanForm;

  async function handleSubmit() {
    const loanCreate = getLoan();
    try {
      const loan = await createLoan(loanCreate);
      onLoanAdded(loan);
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
