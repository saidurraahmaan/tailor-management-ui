import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function OrderDeliveryPie({ data, height, width }) {
  return (
    <PieChart
      series={[
        {
          data: data || [
            { id: 0, value: 10, label: "series A" },
            { id: 1, value: 15, label: "series B" },
            { id: 2, value: 20, label: "series C" },
            
          ],
        },
      ]}
      width={width || 400}
      height={height || 200}
    />
  );
}
