import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarLineChart = ({ name, data }) => {
  return (
    <div style={{ width: "100%", height: "250px" }}>
      <h1 className="font-bold text-center">{name}</h1>
      <ResponsiveContainer>
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          {/* Bar for Views */}
          <Bar dataKey="views" barSize={20} fill="#8884d8" />
          {/* Line for Sales */}
          <Line type="monotone" dataKey="sales" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarLineChart;
