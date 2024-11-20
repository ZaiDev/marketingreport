import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ChartProps {
  data: any;
  budget: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function ROIChart({ data, budget }: ChartProps) {
  const budgetNum = parseInt(budget.replace(/[^0-9]/g, ''));
  const monthlyData = [
    { month: 'Month 1', investment: budgetNum, projected: budgetNum * 0.8 },
    { month: 'Month 2', investment: budgetNum * 2, projected: budgetNum * 1.8 },
    { month: 'Month 3', investment: budgetNum * 3, projected: budgetNum * 3.2 },
    { month: 'Month 4', investment: budgetNum * 4, projected: budgetNum * 5.1 },
    { month: 'Month 5', investment: budgetNum * 5, projected: budgetNum * 7.5 },
    { month: 'Month 6', investment: budgetNum * 6, projected: budgetNum * 10.2 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="investment" fill="#8884d8" name="Investment" />
        <Bar dataKey="projected" fill="#82ca9d" name="Projected Return" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function BudgetAllocationChart({ data }: ChartProps) {
  const allocationData = [
    { name: 'Digital Ads', value: 30 },
    { name: 'Content', value: 25 },
    { name: 'Social Media', value: 20 },
    { name: 'Events', value: 25 },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={allocationData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {allocationData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}