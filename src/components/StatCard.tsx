
import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export function StatCard({ title, value, icon, color = "bg-library-primary" }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 flex">
        <div className={`${color} text-white p-4 flex items-center justify-center`}>
          {icon}
        </div>
        <div className="p-4 flex-1">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
