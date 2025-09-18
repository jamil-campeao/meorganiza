import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";

const monthlyData = [
  { month: "Jan", receitas: 7500, despesas: 4200 },
  { month: "Fev", receitas: 8200, despesas: 3800 },
  { month: "Mar", receitas: 7800, despesas: 4500 },
  { month: "Abr", receitas: 8500, despesas: 4230 },
  { month: "Mai", receitas: 9200, despesas: 4800 },
  { month: "Jun", receitas: 8800, despesas: 4100 }
];

const categoryData = [
  { name: "Alimentação", value: 1200, color: "#DC2626" },
  { name: "Transporte", value: 800, color: "#3B82F6" },
  { name: "Lazer", value: 650, color: "#F59E0B" },
  { name: "Saúde", value: 480, color: "#22C55E" },
  { name: "Outros", value: 1100, color: "#8B5CF6" }
];

export function TransactionChart() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border border-[#64748B] bg-[#3F4A5C]">
        <CardHeader>
          <CardTitle className="text-[#E2E8F0]">Receitas vs Despesas</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#64748B" />
              <XAxis 
                dataKey="month" 
                stroke="#E2E8F0"
                fontSize={12}
              />
              <YAxis 
                stroke="#E2E8F0"
                fontSize={12}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#64748B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }}
                formatter={(value) => [`R$ ${value}`, '']}
              />
              <Bar dataKey="receitas" fill="#22C55E" radius={4} />
              <Bar dataKey="despesas" fill="#DC2626" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border border-[#64748B] bg-[#3F4A5C]">
        <CardHeader>
          <CardTitle className="text-[#E2E8F0]">Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                strokeWidth={0}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#64748B',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#E2E8F0'
                }}
                formatter={(value) => [`R$ ${value}`, 'Valor']}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-[#E2E8F0]">{item.name}</span>
                </div>
                <span className="text-sm text-[#E2E8F0]">R$ {item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}