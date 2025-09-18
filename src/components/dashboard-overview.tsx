import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Wallet, Target } from "lucide-react";

const overviewData = [
  {
    title: "Saldo Total",
    value: "R$ 15.230,45",
    change: "+12%",
    trend: "up",
    icon: Wallet,
    color: "#3B82F6"
  },
  {
    title: "Receitas do Mês",
    value: "R$ 8.500,00",
    change: "+5%",
    trend: "up",
    icon: TrendingUp,
    color: "#22C55E"
  },
  {
    title: "Despesas do Mês",
    value: "R$ 4.230,15",
    change: "-8%",
    trend: "down",
    icon: TrendingDown,
    color: "#DC2626"
  },
  {
    title: "Objetivo Mensal",
    value: "75%",
    change: "R$ 1.500 restante",
    trend: "up",
    icon: Target,
    color: "#F59E0B"
  }
];

export function DashboardOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((item, index) => (
        <Card key={index} className="border border-[#64748B] bg-[#3F4A5C]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#E2E8F0]">
              {item.title}
            </CardTitle>
            <item.icon 
              className="h-4 w-4" 
              style={{ color: item.color }}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#E2E8F0]">
              {item.value}
            </div>
            <p className={`text-xs ${
              item.trend === 'up' ? 'text-[#22C55E]' : 'text-[#DC2626]'
            }`}>
              {item.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}