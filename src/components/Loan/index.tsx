import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useLoan } from "../../hooks/useLoans";
import LoanDeleteDialog from "../LoanDeleteDialog";
import LoanEditDialog from "../LoanEditDialog";
import AmortizationTable from "./AmortizationTable";
import LoanInfoCard from "./LoanInfoCard";

enum LoanTabs {
  amortization,
}

const Loan: React.FC = () => {
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  const { error, isLoading, loan } = useLoan(params.id);
  const [edit, setEdit] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [tab, setTab] = React.useState(LoanTabs.amortization);

  if (error) {
    throw error;
  } else if (!isLoading && !loan) {
    return <Typography>Loan not found</Typography>;
  } else {
    return (
      <div className={classes.root}>
        <LoanInfoCard
          loan={loan}
          onDeleteClick={() => setDeleteOpen(true)}
          onEditClick={() => setEdit(true)}
        />
        {loan ? (
          <Card>
            <Tabs onChange={(_, v) => setTab(v)} value={tab}>
              <Tab
                label="Amortization Schedule"
                value={LoanTabs.amortization}
              />
            </Tabs>
            {tab === LoanTabs.amortization && <AmortizationTable loan={loan} />}
          </Card>
        ) : (
          <CircularProgress size="5rem" style={{ justifySelf: "center" }} />
        )}
        {loan && (
          <LoanDeleteDialog
            loan={loan}
            onClose={() => setDeleteOpen(false)}
            open={deleteOpen}
          />
        )}
        {loan && (
          <LoanEditDialog
            loan={loan}
            onClose={() => setEdit(false)}
            open={edit}
          />
        )}
      </div>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridGap: theme.spacing(),
    gridTemplateRows: "min-content min-content",
  },
}));

export default Loan;
