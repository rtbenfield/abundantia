import { Card, CardHeader, useTheme } from "@material-ui/core";
import * as React from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AmortizationPayment, Scenario } from "../../../hooks/useScenarios";

interface ComparisonChartProps {
  baseScenario: readonly AmortizationPayment[];
  field: keyof AmortizationPayment;
  scenarios: readonly Scenario[];
  title: string;
}

const ComparisonChart: React.FC<ComparisonChartProps> = ({ baseScenario, field, scenarios, title }) => {
  const theme = useTheme();
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
        date: base.date.getTime(),
        ...dateScenarios,
      };
    });
  }, [baseScenario, field, scenarios]);
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null);

  return (
    <Card>
      <CardHeader title={title} titleTypographyProps={{ variant: "h6" }} />
      <ResponsiveContainer height={240}>
        <LineChart onClick={e => setPosition({ x: e.chartX, y: e.chartY })} data={data} syncId="explore">
          <Tooltip
            contentStyle={{
              backgroundColor: theme.palette.background.paper,
              border: "none",
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[23],
            }}
            cursor={{
              stroke: theme.palette.divider,
            }}
            formatter={(value, name) => [currencyFormat.format(+value), name]}
            labelFormatter={value => dateFormat.format(new Date(value))}
            labelStyle={theme.typography.caption}
            active={!!position}
            position={position ?? undefined}
          />
          <XAxis dataKey="date" hide />
          <YAxis domain={[0, "dataMax"]} hide type="number" />
          <Line
            activeDot={{
              stroke: "none",
            }}
            dataKey="base"
            dot={false}
            name="Base"
            stroke={colors[0]}
          />
          {scenarios.map((s, i) => {
            return (
              <Line
                activeDot={{
                  stroke: "none",
                }}
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

const colors: readonly string[] = [
  "#B48EAD",
  "#D08770",
  "#A3BE8C",
  "#EBCB8B",
  "#8FBCBB",
  "#88C0D0",
  "#88C0D0",
  "#5E81AC",
  "#BF616A",
];

const currencyFormat = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "numeric",
  timeZone: "UTC",
  year: "numeric",
});
