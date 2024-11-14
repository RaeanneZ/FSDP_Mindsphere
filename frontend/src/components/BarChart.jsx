import React from "react";
import { Bar, BarChart, Rectangle, Tooltip, XAxis, YAxis } from "recharts";

const BarChartComponent = ({ data }) => {
  return (
    <BarChart width={300} height={200} data={data}>
      <Bar
        dataKey="aveRating"
        fill="#0E9BAC"
        activeBar={<Rectangle fill="#0E8392" />}
      />
      <XAxis dataKey="month" />
      <YAxis dataKey="aveRating" type="number" domain={[0, 5]} />
      <Tooltip cursor={{ fill: "transparent" }} />
    </BarChart>
  );
};

export default BarChartComponent;
