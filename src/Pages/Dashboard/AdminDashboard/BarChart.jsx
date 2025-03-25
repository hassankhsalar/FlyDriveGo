"use client";
import { FaCalendar } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { MdArrowDropUp } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  {
    name: "Sat",
    revenue: 40,
    profit: 24,
  },
  {
    name: "Sun",
    revenue: 30,
    profit: 13,
  },
  {
    name: "Mon",
    revenue: 98,
    profit: 20,
  },
  {
    name: "Tue",
    revenue: 39,
    profit: 27,
  },
  {
    name: "Wed",
    revenue: 48,
    profit: 18,
  },
  {
    name: "Thu",
    revenue: 38,
    profit: 23,
  },
  {
    name: "Fri",
    revenue: 38,
    profit: 23,
  },
];

const BarChartComponent = () => {
  return (
    <div className="w-full h-[420px] p-4 bg-slate-200 shadow-md rounded-lg">
      <div>
        <div className="flex items-center justify-between pb-3 w-10/12 mx-auto">
          <button className="w-32 font-poppins flex items-center gap-2 bg-gray-500 bg-opacity-20 p-2 rounded-lg text-slate-500">
            <FaCalendar></FaCalendar>Weekly
          </button>
          <RiBarChart2Fill className="text-gray-600 text-2xl" />
        </div>
      </div>
      <div className="w-full h-[350px] p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={salesData}
            margin={{
              right: 30,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="revenue" fill="#2563eb" />
            <Bar dataKey="profit" fill="#8b5cf6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChartComponent;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Revenue:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Profit:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    );
  }
};
