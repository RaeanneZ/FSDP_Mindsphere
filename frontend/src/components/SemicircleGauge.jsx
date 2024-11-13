// SemiCircleGauge.js
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const SemiCircleGauge = ({ currentCount, maxCount }) => {
  const data = [
    { value: currentCount, color: "#607D8B" },
    { value: maxCount - currentCount, color: "#B2EBF2" },
  ];

  return (
    <PieChart width={400} height={200}>
      <Pie
        data={data}
        startAngle={180}
        endAngle={0}
        innerRadius={70}
        outerRadius={100}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell
            style={{ outline: "none" }}
            key={`cell-${index}`}
            fill={entry.color}
          />
        ))}
      </Pie>
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="20"
      >
        {currentCount}
      </text>
      <text
        x="80%"
        y="45%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fill="#00ACC1"
      >
        {maxCount}
      </text>
    </PieChart>
  );
};

export default SemiCircleGauge;
