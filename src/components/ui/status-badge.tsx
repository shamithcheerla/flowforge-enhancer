import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "high" | "medium" | "low" | "completed" | "in-progress" | "todo" | "review";
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variants = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20",
    completed: "bg-success/10 text-success border-success/20",
    "in-progress": "bg-primary/10 text-primary border-primary/20",
    todo: "bg-muted text-muted-foreground border-muted-foreground/20",
    review: "bg-warning/10 text-warning border-warning/20",
  };

  const labels = {
    high: "High",
    medium: "Medium", 
    low: "Low",
    completed: "Completed",
    "in-progress": "In Progress",
    todo: "To Do",
    review: "Review",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}