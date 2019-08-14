import { Card, Fab, makeStyles, Tabs, Tab, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import * as React from "react";
import useLoan from "../../../hooks/useLoan";
import AmortizationTable from "../AmortizationTable";
import LoanInfoCard from "./LoanInfoCard";
import PaymentsTable from "../PaymentsTable";
import AddPaymentDialog from "./AddPaymentDialog";

interface LoanOverviewProps {
  deletePath: string;
  editPath: string;
  explorePath: string;
  loanId: string;
}

const LoanOverview: React.FunctionComponent<LoanOverviewProps> = ({ deletePath, editPath, explorePath, loanId }) => {
  const classes = useStyles();
  const [tab, setTab] = React.useState<"amortization" | "payments">("payments");
  const [addPaymentOpen, setAddPaymentOpen] = React.useState(false);
  const { error, loading, loan } = useLoan(loanId);

  if (loading || !loan) {
    return null;
  } else if (error) {
    return <Typography variant="h1">{error.message}</Typography>;
  } else if (!loan) {
    return <Typography variant="h1">Loan not found</Typography>;
  } else {
    return (
      <div className={classes.root}>
        <LoanInfoCard
          className={classes.info}
          editPath={editPath}
          explorePath={explorePath}
          deletePath={deletePath}
          loan={loan}
        />
        <Card className={classes.content}>
          <Tabs indicatorColor="primary" onChange={(_, v) => setTab(v)} value={tab}>
            <Tab label={`Payments (${loan.payments.length})`} value="payments" />
            <Tab label="Amortization Schedule" value="amortization" />
          </Tabs>
          {tab === "amortization" && (
            <div role="tabpanel">
              <AmortizationTable loan={loan} />
            </div>
          )}
          {tab === "payments" && (
            <div role="tabpanel">
              <PaymentsTable payments={loan.payments} />
            </div>
          )}
        </Card>
        <Fab aria-label="Add Payment" className={classes.fab} color="primary" onClick={() => setAddPaymentOpen(true)}>
          <AddIcon />
        </Fab>
        <AddPaymentDialog loanId={loanId} onClose={() => setAddPaymentOpen(false)} open={addPaymentOpen} />
      </div>
    );
  }
};

const useStyles = makeStyles(theme => ({
  content: {
    gridArea: "content",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  info: {
    gridArea: "info",
  },
  root: {
    display: "grid",
    gridGap: theme.spacing(),
    gridTemplateAreas: `
      "info"
      "content"
    `,
    gridTemplateRows: "min-content min-content",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: theme.breakpoints.values.md,
  },
}));

export default LoanOverview;