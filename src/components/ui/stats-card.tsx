import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("bg-surface border-card-border shadow-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {(subtitle || trend) && (
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
            {trend && (
              <span className={cn(
                "font-medium",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.value}
              </span>
            )}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}