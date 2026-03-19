import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ListTodo,
  CheckCircle2,
  Workflow,
  AlertTriangle,
  Bot,
  ArrowRight,
  Clock,
} from "lucide-react";

const kpis = [
  { label: "Tasks Created", value: "47", change: "+12 this week", icon: ListTodo, color: "text-primary bg-primary/10 border-primary/20" },
  { label: "Tasks Completed", value: "38", change: "81% completion", icon: CheckCircle2, color: "text-success bg-success/10 border-success/20" },
  { label: "Active Workflows", value: "3", change: "2 running now", icon: Workflow, color: "text-accent-foreground bg-accent border-accent-foreground/20" },
  { label: "Escalations", value: "5", change: "2 pending", icon: AlertTriangle, color: "text-warning bg-warning/10 border-warning/20" },
];

const recentActivity = [
  { time: "2 min ago", agent: "Decision Agent", action: "Extracted 4 action items from Q3 planning meeting", status: "completed" },
  { time: "5 min ago", agent: "Task Agent", action: "Created 4 tasks with priorities and deadlines", status: "completed" },
  { time: "5 min ago", agent: "Assignment Agent", action: "Assigned tasks to 3 team members based on expertise", status: "completed" },
  { time: "8 min ago", agent: "Monitoring Agent", action: "Detected 1 task approaching deadline", status: "warning" },
  { time: "12 min ago", agent: "Escalation Agent", action: "Sent escalation to manager for overdue task", status: "escalated" },
  { time: "1 hr ago", agent: "Decision Agent", action: "Processed sprint retrospective transcript", status: "completed" },
];

const statusColors: Record<string, string> = {
  completed: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  escalated: "bg-destructive/10 text-destructive border-destructive/20",
};

const AutoOpsDashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <Card className="glass-card-hover border-border/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-medium">{kpi.label}</p>
                    <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
                    <p className="text-xs text-muted-foreground">{kpi.change}</p>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${kpi.color}`}>
                    <kpi.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Recent Agent Activity
              </CardTitle>
              <Badge variant="secondary" className="font-normal text-xs">
                Live Feed
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-1 pt-0">
            {recentActivity.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-2 min-w-[90px]">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-foreground">{activity.agent}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
                </div>
                <Badge className={`${statusColors[activity.status]} border text-[10px] uppercase tracking-wider`}>
                  {activity.status}
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AutoOpsDashboard;
