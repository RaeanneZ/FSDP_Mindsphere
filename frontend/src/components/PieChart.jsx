// PieChartComponent.js
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const PieChartComponent = ({ data, onPieClick }) => {
  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        label={({ name, views }) => `${name}: ${views}`}
        outerRadius={150}
        fill="#8884d8"
        onClick={(entry) => onPieClick(entry.name)}
      >
        {data.map((entry, index) => (
          <Cell
            style={{ outline: "none" }}
            key={`cell-${index}`}
            fill={entry.color}
          />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;