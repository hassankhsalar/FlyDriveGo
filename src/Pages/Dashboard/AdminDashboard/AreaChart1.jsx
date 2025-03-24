'use client';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const productSales = [
  {
    name: 'Jan',
    Yoga: 4000,
    strength: 2400,
  },
  {
    name: 'Feb',
    Yoga: 3000,
    strength: 2210,
  },
  {
    name: 'Mar',
    Yoga: 2000,
    strength: 2290,
  },
  {
    name: 'Apr',
    Yoga: 2780,
    strength: 2000,
  },
  {
    name: 'May',
    Yoga: 1890,
    strength: 2181,
  },
  {
    name: 'Jun',
    Yoga: 2390,
    strength: 2500,
  },
];

const AreaChart1 = () => {
    return (
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
              dataKey="Yoga"
              stroke="#2563eb"
              fill="#3b82f6"
              stackId="1"
            />
    
            <Area
              type="monotone"
              dataKey="strength"
              stroke="#7c3aed"
              fill="#8b5cf6"
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
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
