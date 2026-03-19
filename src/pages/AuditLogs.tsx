import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollText, Brain, ListTodo, UserCheck, Eye, AlertTriangle } from "lucide-react";

const agentColors: Record<string, string> = {
  "Decision Agent": "text-purple-600 bg-purple-50 border-purple-200",
  "Task Agent": "text-primary bg-primary/10 border-primary/20",
  "Assignment Agent": "text-emerald-600 bg-emerald-50 border-emerald-200",
  "Monitoring Agent": "text-amber-600 bg-amber-50 border-amber-200",
  "Escalation Agent": "text-red-500 bg-red-50 border-red-200",
};

const agentIcons: Record<string, React.ElementType> = {
  "Decision Agent": Brain,
  "Task Agent": ListTodo,
  "Assignment Agent": UserCheck,
  "Monitoring Agent": Eye,
  "Escalation Agent": AlertTriangle,
};

const logs = [
  { timestamp: "2026-03-19 10:32:14", agent: "Decision Agent", action: "Extracted decisions", reason: "3 action items detected via NLP keyword matching (must, need, should) in meeting transcript" },
  { timestamp: "2026-03-19 10:33:01", agent: "Task Agent", action: "Created task: Update API docs", reason: "Deadline keyword 'by end of next week' detected — auto-classified as High priority due to explicit urgency" },
  { timestamp: "2026-03-19 10:33:02", agent: "Task Agent", action: "Created task: Q3 metrics report", reason: "Deadline 'by Friday' detected — classified as Medium priority, no urgency modifiers found" },
  { timestamp: "2026-03-19 10:33:03", agent: "Task Agent", action: "Created task: Schedule team sync", reason: "Action verb 'schedule' detected — classified as Low priority, routine coordination task" },
  { timestamp: "2026-03-19 10:33:22", agent: "Assignment Agent", action: "Assigned to Sarah Chen", reason: "Expertise match: Sarah has 'backend' and 'API' tags — highest relevance score (0.94) for documentation task" },
  { timestamp: "2026-03-19 10:33:23", agent: "Assignment Agent", action: "Assigned to Mike Johnson", reason: "Expertise match: Mike has 'analytics' and 'reporting' tags — self-volunteered in transcript ('I'll have...')" },
  { timestamp: "2026-03-19 10:33:24", agent: "Assignment Agent", action: "Assigned to Lisa Park", reason: "Role match: Lisa is PM — scheduling tasks auto-routed to project management role" },
  { timestamp: "2026-03-19 10:34:00", agent: "Monitoring Agent", action: "Set deadline watchers", reason: "5 tasks with explicit deadlines — monitoring intervals: 48h warning, 24h critical, overdue escalation" },
  { timestamp: "2026-03-19 10:35:12", agent: "Monitoring Agent", action: "Warning: Task #2 approaching", reason: "Q3 metrics report due in 47h — current completion estimate: 30% based on no update activity" },
  { timestamp: "2026-03-19 14:01:00", agent: "Escalation Agent", action: "Escalation Level 1 triggered", reason: "Task #4 (budget proposal) overdue by 3h — SLA breach threshold exceeded, manager notification sent" },
];

const AuditLogs = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-primary" />
                Audit Logs
              </CardTitle>
              <Badge variant="secondary" className="text-xs font-normal">
                {logs.length} entries
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider w-[170px]">Timestamp</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider w-[160px]">Agent</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider w-[220px]">Action</TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider">Reason (AI Explanation)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log, i) => {
                    const Icon = agentIcons[log.agent] || ScrollText;
                    const color = agentColors[log.agent] || "";

                    return (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-border/30 hover:bg-muted/20 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground">
                          {log.timestamp}
                        </TableCell>
                        <TableCell>
                          <Badge className={`${color} border text-[10px] tracking-wider gap-1`}>
                            <Icon className="h-3 w-3" />
                            {log.agent.replace(" Agent", "")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm font-medium">{log.action}</TableCell>
                        <TableCell className="text-xs text-muted-foreground leading-relaxed max-w-md">
                          {log.reason}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuditLogs;
