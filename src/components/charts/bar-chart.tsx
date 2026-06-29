"use client";

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";

interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

export function BarChart({ data, xKey, yKey, color = "#3fa7a0", height = 280 }: BarChartProps) {
  const { resolvedTheme } = useTheme();
  const gridColor = resolvedTheme === "dark" ? "#3a352c" : "#e7ded0";
  const textColor = resolvedTheme === "dark" ? "#998d7c" : "#6b6354";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: textColor }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12, fill: textColor }} tickLine={false} axisLine={false} width={32} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "none",
            background: resolvedTheme === "dark" ? "#1c1a16" : "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: 13,
          }}
        />
        <Bar dataKey={yKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={42} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
