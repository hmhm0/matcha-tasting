"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface TasteProfileChartProps {
  data: {
    subject: string;
    A: number; // Value
    fullMark: number;
  }[];
}

export function TasteProfileChart({ data }: TasteProfileChartProps) {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
          />
          <Radar
            name="Taste Profile"
            dataKey="A"
            stroke="var(--color-primary)"
            fill="var(--color-primary)"
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: "var(--color-card)", borderRadius: "8px", border: "1px solid var(--color-border)" }}
            itemStyle={{ color: "var(--color-foreground)" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
