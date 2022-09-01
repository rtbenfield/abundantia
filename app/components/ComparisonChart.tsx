import { Text } from "@mantine/core";
import { createStyles, useMantineTheme } from "@mantine/styles";
import { curveNatural } from "@visx/curve";
import { localPoint } from "@visx/event";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Line, LinePath } from "@visx/shape";
import { defaultStyles, useTooltip, useTooltipInPortal } from "@visx/tooltip";
import { max } from "d3-array";
import { useRef } from "react";
import type { AmortizationPayment } from "~/services/amortization";
import type { Scenario } from "~/services/prisma.server";

interface Props {
  domain: [Date, Date];
  field: Exclude<keyof AmortizationPayment, "date" | "paymentNumber">;
  scenarios: ReadonlyArray<ScenarioSeries>;
  size: Readonly<{
    height: number;
    width: number;
  }>;
}

export interface ScenarioSeries {
  readonly color: string;
  readonly payments: readonly AmortizationPayment[];
  readonly scenario: Pick<Scenario, "id" | "name">;
}

interface ScenarioTooltip {
  readonly color: string;
  readonly payment: AmortizationPayment;
  readonly scenario: ScenarioSeries["scenario"];
}

const useStyles = createStyles((theme) => ({
  tooltip: {
    ...(defaultStyles as any),
    // backgroundColor: fade(theme.palette.background.default, 0.92),
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    zIndex: 1_000,
  },
  tooltipLine: {
    stroke: theme.primaryColor,
  },
}));

export function ComparisonChart({
  domain,
  field,
  scenarios,
  size: { height, width },
}: Props) {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const margin = { top: theme.spacing.md };
  const xScale = scaleTime({
    domain,
    range: [0, width],
  });
  const yScale = scaleLinear({
    domain: [
      0,
      max(
        scenarios.flatMap(({ payments }) => payments),
        (x) => x[field]
      ) ?? 0,
    ],
    range: [height, margin.top],
  });

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });
  const {
    hideTooltip,
    showTooltip,
    tooltipData,
    tooltipLeft,
    tooltipOpen,
    tooltipTop,
  } = useTooltip<readonly ScenarioTooltip[]>();

  const lastFrameRef = useRef<number>(0);
  function handlePointerMove(event: React.PointerEvent<SVGSVGElement>) {
    const point = localPoint(event);
    if (point) {
      window.cancelAnimationFrame(lastFrameRef.current);
      lastFrameRef.current = window.requestAnimationFrame(() => {
        const cursorDate = xScale.invert(point.x);
        const newTooltipData = scenarios
          .map<ScenarioTooltip | null>(({ color, payments, scenario }) => {
            const payment = payments.find(
              (x) =>
                x.date.getMonth() === cursorDate.getMonth() &&
                x.date.getFullYear() === cursorDate.getFullYear()
            );
            return payment ? { color, payment, scenario } : null;
          })
          .filter((x): x is Exclude<typeof x, null> => x !== null);
        showTooltip({
          tooltipLeft: point.x,
          tooltipTop: point.y,
          tooltipData: newTooltipData,
        });
      });
    }
  }
  function handlePointerLeave() {
    window.cancelAnimationFrame(lastFrameRef.current);
    hideTooltip();
  }

  return (
    <svg
      height={height}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={containerRef}
      width={width}
    >
      {tooltipOpen && (
        <>
          <TooltipInPortal
            className={classes.tooltip}
            left={tooltipLeft}
            top={tooltipTop}
            unstyled
          >
            <table>
              {typeof tooltipLeft === "number" && (
                <Text component="caption">
                  {date.format(xScale.invert(tooltipLeft))}
                </Text>
              )}
              <tbody>
                {tooltipData?.map(({ color, scenario, payment }) => (
                  <tr key={scenario.id} style={{ color }}>
                    <Text component="th" scope="row">
                      {scenario.name}
                    </Text>
                    <Text component="td">
                      {usd.format(payment[field] * 100)}
                    </Text>
                  </tr>
                ))}
              </tbody>
            </table>
          </TooltipInPortal>
          <Line
            className={classes.tooltipLine}
            from={{ x: tooltipLeft, y: 0 }}
            pointerEvents="none"
            strokeWidth={2}
            to={{ x: tooltipLeft, y: height + margin.top }}
          />
        </>
      )}
      {scenarios.map(({ color, payments, scenario }) => {
        return (
          <LinePath<AmortizationPayment>
            curve={curveNatural}
            // LinePath expects a mutable array, but doesn't actually mutate it
            data={payments as Array<typeof payments[0]>}
            key={scenario.id}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d[field])}
            stroke={color}
            fill="transparent"
          />
        );
      })}
    </svg>
  );
}

const usd = new Intl.NumberFormat("en-US", {
  currency: "usd",
  style: "currency",
});

const date = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});
