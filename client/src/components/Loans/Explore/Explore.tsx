import { makeStyles, Paper, Typography } from "@material-ui/core";
import * as React from "react";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import useLoan, { Loan } from "../../../hooks/useLoan";
import useScenarios, { ScenarioModel } from "../../../hooks/useScenarios";
import LoadingIndicator from "../../LoadingIndicator";
import { useAmortizationTransform } from "../hooks";
import ComparisonChart from "./ComparisonChart";
import EditScenarioForm from "./EditScenarioForm";
import Scenarios from "./Scenarios";

interface ExploreProps {
  loanId: string;
}

const Explore: React.FunctionComponent<ExploreProps> = ({ loanId }) => {
  useDocumentTitle("Explore");
  const { error, isLoading, loan } = useLoan(loanId);

  if (isLoading) {
    return <LoadingIndicator size="fill" />;
  } else if (error) {
    throw error;
  } else if (!loan) {
    return <Typography variant="h3">Loan not found</Typography>;
  } else {
    return <Explore2 loan={loan} />;
  }
};

const Explore2: React.FunctionComponent<{ loan: Loan }> = ({ loan }) => {
  useDocumentTitle(`Explore ${loan.name}`);
  const classes = useStyles();
  const amortizationSchedule = useAmortizationTransform(loan);
  const [editScenario, setEditScenario] = React.useState<string | null>(null);
  const { addScenario, isLoading, removeScenario, scenarios, updateScenario } = useScenarios(loan);

  async function handleAddScenario() {
    if (scenarios.length < 10) {
      const { id } = await addScenario({ additionalPayments: [], name: `Scenario ${scenarios.length + 1}` });
      setEditScenario(id);
    }
  }

  function handleRemoveScenario(scenario: ScenarioModel) {
    if (editScenario === scenario.id) {
      setEditScenario(null);
    }
    removeScenario(scenario);
  }

  function handleSaveScenario(scenario: ScenarioModel) {
    updateScenario(scenario);
    setEditScenario(null);
  }

  if (isLoading) {
    return <LoadingIndicator size="fill" />;
  } else {
    return (
      <div className={classes.root}>
        <Paper square>
          <Scenarios
            loan={loan}
            onAddScenario={handleAddScenario}
            onEditScenario={s => setEditScenario(s.id)}
            onRemoveScenario={handleRemoveScenario}
            scenarios={scenarios}
          />
        </Paper>
        {editScenario === null && (
          <div className={classes.comparison}>
            <ComparisonChart
              baseScenario={amortizationSchedule}
              field="balance"
              scenarios={scenarios}
              title="Balance"
            />
            <ComparisonChart
              baseScenario={amortizationSchedule}
              field="amount"
              scenarios={scenarios}
              title="Payment Amount"
            />
            <ComparisonChart
              baseScenario={amortizationSchedule}
              field="interest"
              scenarios={scenarios}
              title="Interest Per Payment"
            />
            <ComparisonChart
              baseScenario={amortizationSchedule}
              field="principal"
              scenarios={scenarios}
              title="Principal Per Payment"
            />
            <ComparisonChart
              baseScenario={amortizationSchedule}
              field="interestToDate"
              scenarios={scenarios}
              title="Total Interest Paid"
            />
            <ComparisonChart
              baseScenario={amortizationSchedule}
              field="principalToDate"
              scenarios={scenarios}
              title="Total Principal Paid"
            />
          </div>
        )}
        {editScenario !== null && (
          <EditScenarioForm
            key={editScenario}
            onCancel={() => setEditScenario(null)}
            onSave={handleSaveScenario}
            scenario={scenarios.find(x => x.id === editScenario)!}
          />
        )}
      </div>
    );
  }
};

export default Explore;

const useStyles = makeStyles(theme => ({
  comparison: {
    display: "grid",
    gridGap: theme.spacing(),
    gridTemplateColumns: "1fr",
    gridTemplateRows: "min-content min-content min-content min-content min-content min-content",
    padding: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "min-content min-content min-content",
    },
  },
  root: {
    display: "grid",
    flex: 1,
    gridGap: theme.spacing(),
    gridTemplateColumns: `240px 1fr`,
    gridTemplateRows: "1fr",
  },
}));
