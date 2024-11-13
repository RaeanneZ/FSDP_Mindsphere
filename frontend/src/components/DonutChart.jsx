import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const DonutChart = ({ data }) => {
  return (
    <PieChart width={600} height={600}>
      <Tooltip />
      <Pie
        data={data}
        dataKey="views"
        outerRadius={150}
        innerRadius={90}
        label={({ name, views }) => `${name}: ${views}`}
      >
        {data.map((entry, index) => (
          <Cell
            style={{ outline: "none" }}
            key={`cell-${index}`}
            fill={entry.color}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default DonutChart;
