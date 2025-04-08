"use client";
import { FaCalendar } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { MdArrowDropUp } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  {
    name: "Jan",
    revenue: 4000,
    profit: 2400,
  },
  {
    name: "Feb",
    revenue: 3000,
    profit: 1398,
  },
  {
    name: "Mar",
    revenue: 9800,
    profit: 2000,
  },
  {
    name: "Apr",
    revenue: 3908,
    profit: 2780,
  },
  {
    name: "May",
    revenue: 4800,
    profit: 1890,
  },
  {
    name: "Jun",
    revenue: 3800,
    profit: 2390,
  },
];

const LineChartComponent = () => {
  return (
    <div className="w-full h-[420px] p-4 bg-slate-200 shadow-md rounded-lg">
      <div>
        <div>
          <div className="flex items-center justify-between pb-3 w-10/12 mx-auto">
            <button className="w-32 font-poppins flex items-center gap-2 bg-gray-500 bg-opacity-20 p-2 rounded-lg text-slate-500">
              <FaCalendar></FaCalendar>Yearly
            </button>
            <RiBarChart2Fill className="text-gray-600 text-2xl" />
          </div>
        </div>
      </div>
      <div className="w-full h-[350px] p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
            <Line type="monotone" dataKey="profit" stroke="#8b5cf6" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChartComponent;

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
