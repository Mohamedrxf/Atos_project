import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ListTodo, AlertTriangle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  name: string;
  owner: string;
  priority: "High" | "Medium" | "Low";
  deadline: string;
  status: "Pending" | "In Progress" | "Completed" | "Delayed";
}

const initialTasks: Task[] = [
  { id: "1", name: "Update API documentation", owner: "Sarah Chen", priority: "High", deadline: "Mar 25, 2026", status: "In Progress" },
  { id: "2", name: "Complete Q3 metrics report", owner: "Mike Johnson", priority: "Medium", deadline: "Mar 21, 2026", status: "In Progress" },
  { id: "3", name: "Schedule team sync", owner: "Lisa Park", priority: "Low", deadline: "Mar 19, 2026", status: "Completed" },
  { id: "4", name: "Budget proposal draft", owner: "John Smith", priority: "High", deadline: "Mar 20, 2026", status: "Pending" },
  { id: "5", name: "Plan client demo", owner: "Sarah Chen", priority: "Medium", deadline: "Apr 15, 2026", status: "Pending" },
  { id: "6", name: "Code review for auth module", owner: "Mike Johnson", priority: "High", deadline: "Mar 22, 2026", status: "In Progress" },
  { id: "7", name: "Update design system tokens", owner: "Lisa Park", priority: "Low", deadline: "Mar 28, 2026", status: "Pending" },
];

const priorityStyles: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-warning/10 text-warning border-warning/20",
  Low: "bg-muted text-muted-foreground border-border/50",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-muted text-muted-foreground border-border/50",
  "In Progress": "bg-primary/10 text-primary border-primary/20",
  Completed: "bg-success/10 text-success border-success/20",
  Delayed: "bg-destructive/10 text-destructive border-destructive/20",
};

const TasksPage = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [escalation, setEscalation] = useState<string | null>(null);
  const { toast } = useToast();

  const markAsDelayed = (taskId: string) => {
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, status: "Delayed" as const } : t)
    );
    const task = tasks.find(t => t.id === taskId);
    setEscalation(task?.name || null);
    toast({
      title: "⚠️ Escalation Triggered",
      description: `"${task?.name}" has been marked as delayed. Escalation Agent notified manager.`,
      variant: "destructive",
    });
    setTimeout(() => setEscalation(null), 5000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Escalation Alert */}
      <AnimatePresence>
        {escalation && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
          >
            <Card className="border-destructive/30 bg-destructive/5">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive">Escalation Triggered</p>
                  <p className="text-xs text-muted-foreground">
                    "{escalation}" is delayed — Escalation Agent has notified the manager and stakeholders.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ListTodo className="h-5 w-5 text-primary" />
                All Tasks
              </CardTitle>
              <Badge variant="secondary" className="text-xs font-normal">
                {tasks.length} tasks
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Task</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Owner</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Priority</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Deadline</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Status</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tasks.map((task, i) => (
                    <motion.tr
                      key={task.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                    >
                      <TableCell className="font-medium text-sm">{task.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{task.owner}</TableCell>
                      <TableCell>
                        <Badge className={`${priorityStyles[task.priority]} border text-[10px] uppercase tracking-wider`}>
                          {task.priority}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3" />
                          {task.deadline}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${statusStyles[task.status]} border text-[10px] uppercase tracking-wider`}>
                          {task.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {task.status !== "Completed" && task.status !== "Delayed" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markAsDelayed(task.id)}
                            className="text-xs rounded-lg border-destructive/30 text-destructive hover:bg-destructive/10 h-7 px-2.5"
                          >
                            Mark as Delayed
                          </Button>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TasksPage;
