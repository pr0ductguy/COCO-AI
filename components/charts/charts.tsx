"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CHART_COLORS } from "@/lib/analytics";

const axisProps = {
  stroke: "hsl(215 16% 47%)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    borderRadius: 10,
    border: "1px solid hsl(214 32% 91%)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    fontSize: 12,
  },
};

// --- Volume trend (incoming vs outgoing) -----------------------------------
export function VolumeTrendChart({
  data,
}: {
  data: { month: string; incoming: number; outgoing: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
        <defs>
          <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.35} />
            <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
          </linearGradient>
          <linearGradient id="gradOut" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={CHART_COLORS[1]} stopOpacity={0.35} />
            <stop offset="95%" stopColor={CHART_COLORS[1]} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="incoming"
          name="Incoming"
          stroke={CHART_COLORS[0]}
          strokeWidth={2}
          fill="url(#gradIn)"
        />
        <Area
          type="monotone"
          dataKey="outgoing"
          name="Outgoing"
          stroke={CHART_COLORS[1]}
          strokeWidth={2}
          fill="url(#gradOut)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// --- Department performance (horizontal bars) ------------------------------
export function DepartmentBarChart({
  data,
}: {
  data: { department: string; total: number; overdue: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(260, data.length * 38)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 16, left: 10, bottom: 0 }}
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" horizontal={false} />
        <XAxis type="number" {...axisProps} />
        <YAxis
          type="category"
          dataKey="department"
          width={130}
          {...axisProps}
          tick={{ fontSize: 11 }}
        />
        <Tooltip {...tooltipStyle} cursor={{ fill: "hsl(210 40% 96%)" }} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="total" name="Total" fill={CHART_COLORS[1]} radius={[0, 4, 4, 0]} />
        <Bar dataKey="overdue" name="Overdue" fill={CHART_COLORS[0]} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// --- Donut (stakeholder / status breakdown) --------------------------------
export function DonutChart({
  data,
  height = 280,
}: {
  data: { name: string; value: number }[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={60}
          outerRadius={95}
          paddingAngle={2}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
        <Legend
          iconType="circle"
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

// --- SLA trend (line with target) ------------------------------------------
export function SlaTrendChart({
  data,
}: {
  data: { month: string; compliance: number; target: number }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis domain={[70, 100]} {...axisProps} unit="%" />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="compliance"
          name="Compliance"
          stroke={CHART_COLORS[3]}
          strokeWidth={3}
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="target"
          name="Target"
          stroke={CHART_COLORS[0]}
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// --- Radial gauge (single % metric) ----------------------------------------
export function GaugeChart({
  value,
  label,
  color = CHART_COLORS[3],
}: {
  value: number;
  label: string;
  color?: string;
}) {
  const data = [{ name: label, value }];
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RadialBarChart
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={210}
        endAngle={-30}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
        <RadialBar background dataKey="value" cornerRadius={12} fill={color} />
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-3xl font-bold"
        >
          {value}%
        </text>
        <text
          x="50%"
          y="66%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-muted-foreground text-xs"
        >
          {label}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
}

// --- Archive by year (bar) -------------------------------------------------
export function YearBarChart({
  data,
  onSelect,
}: {
  data: { year: string; count: number }[];
  onSelect?: (year: string) => void;
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" vertical={false} />
        <XAxis dataKey="year" {...axisProps} interval={2} angle={-30} dy={10} height={45} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "hsl(210 40% 96%)" }} />
        <Bar
          dataKey="count"
          name="Records"
          fill={CHART_COLORS[5]}
          radius={[4, 4, 0, 0]}
          onClick={(d: { year?: string }) => d?.year && onSelect?.(d.year)}
          className={onSelect ? "cursor-pointer" : ""}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

// --- Generic comparison bars (officer leaderboard etc.) --------------------
export function ComparisonBarChart({
  data,
  dataKey,
  name,
  color = CHART_COLORS[2],
  unit = "",
}: {
  data: { label: string; [k: string]: string | number }[];
  dataKey: string;
  name: string;
  color?: string;
  unit?: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(260, data.length * 40)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 24, left: 10, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(214 32% 91%)" horizontal={false} />
        <XAxis type="number" {...axisProps} unit={unit} />
        <YAxis type="category" dataKey="label" width={120} {...axisProps} tick={{ fontSize: 11 }} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "hsl(210 40% 96%)" }} />
        <Bar dataKey={dataKey} name={name} radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
