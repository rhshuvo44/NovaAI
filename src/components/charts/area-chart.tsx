"use client";

import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { useTheme } from "next-themes";

interface AreaChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
}

export function AreaChart({ data, xKey, yKey, color = "#e8a33d", height = 280 }: AreaChartProps) {
  const { resolvedTheme } = useTheme();
  const gridColor = resolvedTheme === "dark" ? "#3a352c" : "#e7ded0";
  const textColor = resolvedTheme === "dark" ? "#998d7c" : "#6b6354";
  const gradientId = "area-gradient";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
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
        <Area type="monotone" dataKey={yKey} stroke={color} strokeWidth={2.5} fill={`url(#${gradientId})`} />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
