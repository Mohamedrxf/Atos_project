import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Brain, ListTodo, UserCheck, Eye, AlertTriangle } from "lucide-react";

const agentIcons: Record<string, React.ElementType> = {
  "Decision Agent": Brain,
  "Task Agent": ListTodo,
  "Assignment Agent": UserCheck,
  "Monitoring Agent": Eye,
  "Escalation Agent": AlertTriangle,
};

const agentColors: Record<string, string> = {
  "Decision Agent": "text-purple-600 bg-purple-50 border-purple-200",
  "Task Agent": "text-primary bg-primary/10 border-primary/20",
  "Assignment Agent": "text-emerald-600 bg-emerald-50 border-emerald-200",
  "Monitoring Agent": "text-amber-600 bg-amber-50 border-amber-200",
  "Escalation Agent": "text-red-500 bg-red-50 border-red-200",
};

const timeline = [
  { time: "10:32 AM", agent: "Decision Agent", action: "Extracted 3 decisions from Q3 planning transcript", detail: "Parsed 2,400 words, identified key action verbs and deadlines" },
  { time: "10:33 AM", agent: "Task Agent", action: "Created 5 tasks with priorities and deadlines", detail: "Mapped decisions to task structure with auto-priority scoring" },
  { time: "10:33 AM", agent: "Assignment Agent", action: "Assigned tasks to 3 team members", detail: "Matched based on expertise matrix and current workload" },
  { time: "10:34 AM", agent: "Monitoring Agent", action: "Initiated deadline monitoring for all tasks", detail: "Set up watchers with 24h and 48h warning thresholds" },
  { time: "10:35 AM", agent: "Monitoring Agent", action: "Detected Task #2 approaching 48h deadline", detail: "Q3 metrics report due in 47 hours — current progress: 30%" },
  { time: "10:36 AM", agent: "Escalation Agent", action: "Sent warning notification to Mike Johnson", detail: "Pre-escalation alert via Slack and email" },
  { time: "11:15 AM", agent: "Decision Agent", action: "Processed sprint retro meeting transcript", detail: "Parsed 1,800 words from 30-minute meeting recording" },
  { time: "11:16 AM", agent: "Task Agent", action: "Created 3 improvement tasks from retro", detail: "Categorized as: process, tooling, communication" },
  { time: "11:17 AM", agent: "Assignment Agent", action: "Assigned retro tasks to team leads", detail: "Distributed to 2 engineering leads and 1 PM" },
  { time: "2:00 PM", agent: "Monitoring Agent", action: "Task #4 overdue — budget proposal not submitted", detail: "John Smith missed 5:00 PM deadline by 3 hours" },
  { time: "2:01 PM", agent: "Escalation Agent", action: "Escalated to manager: budget proposal overdue", detail: "Escalation level 1 → Direct manager notified with task context" },
];

const AgentActivity = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                Agent Timeline
              </CardTitle>
              <Badge variant="secondary" className="text-xs font-normal">
                {timeline.length} events today
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="relative pl-6">
              {/* Timeline line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />

              <div className="space-y-1">
                {timeline.map((event, i) => {
                  const Icon = agentIcons[event.agent] || Bot;
                  const color = agentColors[event.agent] || "";

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="relative flex gap-4 py-3 pl-6 rounded-xl hover:bg-muted/30 transition-colors group"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-[-13px] top-5 p-1.5 rounded-full border ${color} z-10`}>
                        <Icon className="h-3 w-3" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                            {event.time}
                          </span>
                          <Badge className={`${color} border text-[10px] tracking-wider`}>
                            {event.agent}
                          </Badge>
                        </div>
                        <p className="text-sm font-medium text-foreground">{event.action}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{event.detail}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AgentActivity;
