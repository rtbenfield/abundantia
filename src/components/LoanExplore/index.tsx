import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withProfiler } from "@sentry/react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { useLoan } from "../../hooks/useLoans";
import {
  ScenarioCreateModel,
  useScenarioActions,
  useScenarios,
} from "../../hooks/useScenarios";
import ComparisonChart from "./ComparisonChart";
import EditScenarioForm from "./EditScenarioForm";
import Scenarios from "./Scenarios";

const Explore: React.FC = () => {
  const classes = useStyles();
  const params = useParams<{ id: string }>();
  const { error, isLoading, loan } = useLoan(params.id);
  const { error: error2, isLoading: isLoading2, scenarios } = useScenarios(
    params.id,
  );
  const { createScenario, deleteScenario, updateScenario } = useScenarioActions(
    params.id,
  );
  const [editScenario, setEditScenario] = React.useState<string | null>(null);

  if (error) {
    throw error;
  } else if (error2) {
    throw error2;
  } else if (isLoading || isLoading2) {
    return <CircularProgress />;
  } else if (!loan) {
    return <Typography>Loan not found</Typography>;
  } else {
    const handleAddScenario = async () => {
      if (scenarios.length < 10) {
        const id = await createScenario({
          additionalPayments: [],
          name: `Scenario ${scenarios.length + 1}`,
        });
        setEditScenario(id);
      }
    };

    const handleRemoveScenario = (id: string) => {
      if (editScenario === id) {
        setEditScenario(null);
      }
      deleteScenario(id);
    };

    const handleSaveScenario = async (scenario: ScenarioCreateModel) => {
      if (editScenario) {
        await updateScenario(editScenario, scenario);
        setEditScenario(null);
      }
    };

    return (
      <div className={classes.root}>
        <Paper square>
          <Scenarios
            loan={loan}
            onAddScenario={handleAddScenario}
            onEditScenario={(s) => setEditScenario(s.id)}
            onRemoveScenario={handleRemoveScenario}
            scenarios={scenarios}
          />
        </Paper>
        {editScenario === null && (
          <div className={classes.comparison}>
            <ComparisonChart
              field="balance"
              loan={loan}
              scenarios={scenarios}
              title="Balance"
            />
            <ComparisonChart
              field="amount"
              loan={loan}
              scenarios={scenarios}
              title="Payment Amount"
            />
            <ComparisonChart
              field="interest"
              loan={loan}
              scenarios={scenarios}
              title="Interest Per Payment"
            />
            <ComparisonChart
              field="principal"
              loan={loan}
              scenarios={scenarios}
              title="Principal Per Payment"
            />
            <ComparisonChart
              field="interestToDate"
              loan={loan}
              scenarios={scenarios}
              title="Total Interest Paid"
            />
            <ComparisonChart
              field="principalToDate"
              loan={loan}
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
            scenario={scenarios.find((x) => x.id === editScenario)!}
          />
        )}
      </div>
    );
  }
};

export default withProfiler(Explore, { name: "Explore" });

const useStyles = makeStyles((theme) => ({
  comparison: {
    display: "grid",
    gridGap: theme.spacing(),
    gridTemplateColumns: "1fr",
    gridTemplateRows:
      "min-content min-content min-content min-content min-content min-content",
    padding: theme.spacing(2),
    overflow: "auto",
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
