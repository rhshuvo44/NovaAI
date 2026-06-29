"use client";

import { Cell, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useTheme } from "next-themes";

interface PieChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  height?: number;
}

const DEFAULT_COLORS = ["#e8a33d", "#3fa7a0", "#bbb0a0", "#c14f3f", "#4d9a5d"];

export function PieChart({ data, colors = DEFAULT_COLORS, height = 280 }: PieChartProps) {
  const { resolvedTheme } = useTheme();

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="85%" paddingAngle={2}>
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={colors[index % colors.length]} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: "none",
            background: resolvedTheme === "dark" ? "#1c1a16" : "#ffffff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            fontSize: 13,
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
}
