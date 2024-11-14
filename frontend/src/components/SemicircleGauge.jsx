// SemiCircleGauge.js
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const SemiCircleGauge = ({ currentCount, maxCount }) => {
  const data = [
    { value: currentCount, color: "#607D8B" },
    { value: maxCount - currentCount, color: "#B2EBF2" },
  ];

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius={100}
            outerRadius={120}
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
      </ResponsiveContainer>
    </div>
  );
};

export default SemiCircleGauge;
