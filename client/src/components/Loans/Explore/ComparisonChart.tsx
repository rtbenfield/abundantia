import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import purple from "@material-ui/core/colors/purple";
import indigo from "@material-ui/core/colors/indigo";
import { Card, CardHeader } from "@material-ui/core";
import * as React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Scenario } from "../../../hooks/useScenarios";
import { AmortizationPayment } from "../types";

interface ComparisonChartProps {
  baseScenario: readonly AmortizationPayment[];
  field: keyof AmortizationPayment;
  scenarios: readonly Scenario[];
  title: string;
}

const ComparisonChart: React.FunctionComponent<ComparisonChartProps> = ({ baseScenario, field, scenarios, title }) => {
  const data = React.useMemo(() => {
    return baseScenario.map((base, i) => {
      const dateScenarios = Object.fromEntries(
        scenarios.map((s, si) => [
          `scenario${si}`,
          s.amortizationSchedule[i].balance > 0 ? s.amortizationSchedule[i][field] : null,
        ]),
      );
      return {
        base: base[field],
        date: base.date,
        ...dateScenarios,
      };
    });
  }, [baseScenario, field, scenarios]);

  return (
    <Card>
      <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
      <ResponsiveContainer height={240}>
        <LineChart data={data} syncId="explore">
          <Tooltip label={title} formatter={(value, name) => [currencyFormat.format(+value), name]} />
          <XAxis dataKey="date" hide />
          <YAxis domain={[0, "dataMax"]} hide type="number" />
          <Line dataKey="base" dot={false} name="Base" stroke={colors[0]} />
          {scenarios.map((s, i) => {
            return (
              <Line
                dataKey={`scenario${i}`}
                dot={false}
                name={s.name}
                key={s.id}
                stroke={colors[(i + 1) % colors.length]}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default ComparisonChart;

const colors: readonly string[] = [blue[200], red[200], green[200], purple[200], indigo[200]];

const currencyFormat = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});
