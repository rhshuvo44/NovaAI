"use client";

import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";

interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

export function LineChart({ data, xKey, yKey, color = "#e8a33d", height = 280 }: LineChartProps) {
  const { resolvedTheme } = useTheme();
  const gridColor = resolvedTheme === "dark" ? "#3a352c" : "#e7ded0";
  const textColor = resolvedTheme === "dark" ? "#998d7c" : "#6b6354";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
