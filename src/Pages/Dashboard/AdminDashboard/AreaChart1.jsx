"use client";

import { FaCalendar } from "react-icons/fa";
import { RiBarChart2Fill } from "react-icons/ri";
import { MdArrowDropUp } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const productSales = [
  {
    name: "Jan",
    International: 40,
    Domestic: 24,
  },
  {
    name: "Feb",
    International: 30,
    Domestic: 22,
  },
  {
    name: "Mar",
    International: 20,
    Domestic: 22,
  },
  {
    name: "Apr",
    International: 27,
    Domestic: 20,
  },
  {
    name: "May",
    International: 18,
    Domestic: 21,
  },
  {
    name: "Jun",
    International: 23,
    Domestic: 25,
  },
];

const AreaChart1 = () => {
  return (
    <div className="w-full h-[420px] p-4 bg-slate-200 shadow-md rounded-lg">
      <div className="flex items-center justify-between pb-4 w-10/12 mx-auto">
        <button className="w-32 font-poppins flex items-center gap-2 bg-gray-500 bg-opacity-20 p-2 rounded-lg text-slate-500">
          <FaCalendar></FaCalendar>This month
        </button>
        <RiBarChart2Fill className="text-gray-600 text-2xl" />
      </div>
      <div className="w-full mx-auto flex">
        <div className="w-3/12 ">
          <h1 className="text-4xl font-poppins font-semibold text-primary">$37.5K</h1>
          <div className="flex items-center text-xs font-medium">
            <p>Total Spent:</p>
            <p className="flex"><MdArrowDropUp className="text-green-500 text-lg" />+2.45%</p>
          </div>
          <p className="flex items-center gap-2 mt-6"><TiTick className="bg-green-400 rounded-full text-white" />On Track</p>
        </div>
        <div className="w-9/12 h-[330px] bg-white rounded-2xl pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={productSales}
              margin={{ right: 30 }}
            >
              <YAxis />
              <XAxis dataKey="name" />
              <CartesianGrid strokeDasharray="5 5" />

              <Tooltip content={<CustomTooltip />} />
              <Legend />

              <Area
                type="monotone"
                dataKey="International"
                stroke="#2563eb"
                fill="#3b82f6"
                stackId="1"
              />

              <Area
                type="monotone"
                dataKey="Domestic"
                stroke="#7c3aed"
                fill="#8b5cf6"
                stackId="1"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Yoga:
          <span className="ml-2">${payload[0].value}</span>
        </p>
        <p className="text-sm text-indigo-400">
          Strength:
          <span className="ml-2">${payload[1].value}</span>
        </p>
      </div>
    );
  }
};

export default AreaChart1;
