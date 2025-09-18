import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowUpCircle, ArrowDownCircle, Clock } from "lucide-react";

const transactions = [
  {
    id: 1,
    description: "Salário Abril",
    amount: 8500.00,
    type: "receita",
    category: "Salário",
    date: "2024-04-01",
    time: "09:00"
  },
  {
    id: 2,
    description: "Supermercado",
    amount: -245.80,
    type: "despesa",
    category: "Alimentação",
    date: "2024-04-02",
    time: "14:30"
  },
  {
    id: 3,
    description: "Uber",
    amount: -32.50,
    type: "despesa",
    category: "Transporte",
    date: "2024-04-02",
    time: "18:45"
  },
  {
    id: 4,
    description: "Freelance Design",
    amount: 1200.00,
    type: "receita",
    category: "Freelance",
    date: "2024-04-03",
    time: "10:15"
  },
  {
    id: 5,
    description: "Cinema",
    amount: -45.00,
    type: "despesa",
    category: "Lazer",
    date: "2024-04-03",
    time: "20:00"
  },
  {
    id: 6,
    description: "Dividendos ITUB4",
    amount: 125.30,
    type: "receita",
    category: "Investimentos",
    date: "2024-04-04",
    time: "08:00"
  }
];

export function RecentTransactions() {
  return (
    <Card className="border border-[#64748B] bg-[#3F4A5C]">
      <CardHeader>
        <CardTitle className="text-[#E2E8F0] flex items-center gap-2">
          <Clock className="h-5 w-5 text-[#3B82F6]" />
          Transações Recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-[#64748B]/20 border border-[#64748B]">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'receita' 
                    ? 'bg-[#22C55E]/20' 
                    : 'bg-[#DC2626]/20'
                }`}>
                  {transaction.type === 'receita' ? (
                    <ArrowUpCircle className="h-4 w-4 text-[#22C55E]" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-[#DC2626]" />
                  )}
                </div>
                <div>
                  <p className="text-[#E2E8F0] font-medium">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge 
                      variant="secondary" 
                      className="bg-[#64748B] text-[#E2E8F0] text-xs"
                    >
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-[#E2E8F0]/70">
                      {transaction.date} às {transaction.time}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`text-right ${
                transaction.type === 'receita' 
                  ? 'text-[#22C55E]' 
                  : 'text-[#DC2626]'
              }`}>
                <p className="font-semibold">
                  {transaction.amount > 0 ? '+' : ''}R$ {Math.abs(transaction.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}