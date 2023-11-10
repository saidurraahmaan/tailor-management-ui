import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import dayjs from "dayjs";

const chartSetting = {
  // width: "auto",
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

// const dataset = [
//   { date: "2023-10-31", value: 1 },
//   { date: "2023-10-30", value: 3 },
//   { date: "2023-10-29", value: 4 },
//   { date: "2023-10-28", value: 10 },
//   { date: "2023-10-01", value: 5 },
// ];

const valueFormatter = (value) => `${Number(value)} টি`;

export default function LastThirtyDayOrderCountBar({ data }) {
  const dataset = data.map((item) => ({
    date: dayjs(item.date).format("MMM D"), // Format the date label
    value: item.value,
  }));

  return (
    <div className="mt-3">
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "date",
          },
        ]}
        series={[{ dataKey: "value", valueFormatter }]}
        {...chartSetting}
      />
      <div className="text-center font-w-700 font-secondary">
        শেষ {data.length} দিনের অর্ডারের অবস্থা
      </div>
    </div>
  );
}
