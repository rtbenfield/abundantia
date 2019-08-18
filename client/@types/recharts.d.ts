import * as recharts from "recharts";

declare module "recharts" {
  export interface TooltipProps {
    contentStyle?: React.CSSProperties;
  }
}
