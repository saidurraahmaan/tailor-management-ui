import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function OrderDeliveryPie({ data, height, width }) {
  return (
    <PieChart
      series={[
        {
          data
        },
      ]}
      width={width || 400}
      height={height || 200}
    />
  );
}
