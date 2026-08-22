"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-100">
        <p className="text-xs font-semibold text-gray-500">{data.name}</p>
        <p className="text-base font-bold text-gray-900 mt-0.5">
          {data.prefix || ""}
          {data.value.toLocaleString()}
          {data.unit ? ` ${data.unit}` : ""}
        </p>
      </div>
    );
  }
  return null;
};

export default function RevenueAnalytics({ revenueData }) {
  const stats = revenueData || {
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalBookings: 0,
  };

  const chartData = [
    {
      name: "Total Revenue",
      value: stats.totalRevenue || 0,
      fill: "#2563eb",
      prefix: "৳ ",
    },
    {
      name: "Tickets Sold",
      value: stats.totalTicketsSold || 0,
      fill: "#059669",
      unit: "pcs",
    },
    {
      name: "Total Bookings",
      value: stats.totalBookings || 0,
      fill: "#d97706",
      unit: "orders",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stat Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Total Revenue
          </p>
          <p className="text-2xl font-black text-gray-900 mt-2">
            ৳ {(stats.totalRevenue || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Tickets Sold
          </p>
          <p className="text-2xl font-black text-emerald-600 mt-2">
            {(stats.totalTicketsSold || 0).toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Total Bookings
          </p>
          <p className="text-2xl font-black text-amber-600 mt-2">
            {(stats.totalBookings || 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-gray-900">
            Performance Overview
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Visual comparison of revenue, ticket volume, and successful orders.
          </p>
        </div>

        <div className="w-full h-72 sm:h-80 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "#f8fafc" }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={64}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
