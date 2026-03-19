import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  ListTodo,
  UserCheck,
  Eye,
  AlertTriangle,
  Play,
  Upload,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from "lucide-react";

interface AgentState {
  id: string;
  name: string;
  icon: React.ElementType;
  status: "idle" | "running" | "completed";
  logs: string[];
  color: string;
}

const initialAgents: AgentState[] = [
  { id: "decision", name: "Decision Agent", icon: Brain, status: "idle", logs: [], color: "text-purple-600 bg-purple-50 border-purple-200" },
  { id: "task", name: "Task Agent", icon: ListTodo, status: "idle", logs: [], color: "text-primary bg-primary/10 border-primary/20" },
  { id: "assignment", name: "Assignment Agent", icon: UserCheck, status: "idle", logs: [], color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { id: "monitoring", name: "Monitoring Agent", icon: Eye, status: "idle", logs: [], color: "text-amber-600 bg-amber-50 border-amber-200" },
  { id: "escalation", name: "Escalation Agent", icon: AlertTriangle, status: "idle", logs: [], color: "text-red-500 bg-red-50 border-red-200" },
];

const agentLogs: Record<string, string[]> = {
  decision: [
    "Parsing transcript...",
    "Identified 3 decisions and 5 action items",
    "Extracted deadlines for 4 items",
    "Classified priority levels",
  ],
  task: [
    "Creating tasks from extracted items...",
    "Task 1: 'Update API documentation' → High priority",
    "Task 2: 'Review Q3 metrics' → Medium priority",
    "Task 3: 'Schedule team sync' → Low priority",
    "Created 5 tasks successfully",
  ],
  assignment: [
    "Analyzing team member expertise...",
    "Assigned 'API docs' → Sarah (Backend lead)",
    "Assigned 'Q3 metrics' → Mike (Analytics)",
    "Assigned 'Team sync' → Lisa (PM)",
    "All tasks assigned with notifications sent",
  ],
  monitoring: [
    "Setting up deadline watchers...",
    "Monitoring 5 tasks across 3 assignees",
    "Alert: Task 2 due in 48 hours",
    "All task progress tracking active",
  ],
  escalation: [
    "Checking for overdue items...",
    "No immediate escalations needed",
    "Escalation rules configured",
    "Watching for SLA breaches",
  ],
};

const sampleTranscript = `Meeting: Q3 Planning Review
Date: March 18, 2026
Attendees: Sarah, Mike, Lisa, John

Sarah: "We need to update the API documentation by end of next week. This is high priority."

Mike: "I'll have the Q3 metrics report ready by Friday. Can someone review it?"

Lisa: "Let's schedule a team sync for Wednesday. I'll also need the budget proposal from John by Thursday."

John: "I'll get the budget numbers together. We should also plan the client demo for next month."

Action Items:
1. Update API documentation - Due: March 25
2. Complete Q3 metrics report - Due: March 21
3. Schedule team sync - Due: March 19
4. Budget proposal - Due: March 20
5. Plan client demo - Due: April 15`;

const RunWorkflow = () => {
  const [transcript, setTranscript] = useState("");
  const [agents, setAgents] = useState<AgentState[]>(initialAgents);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAgentIndex, setCurrentAgentIndex] = useState(-1);

  const runWorkflow = useCallback(async () => {
    if (!transcript.trim()) return;
    setIsRunning(true);
    setAgents(initialAgents);

    for (let i = 0; i < initialAgents.length; i++) {
      setCurrentAgentIndex(i);

      // Set agent to running
      setAgents(prev => prev.map((a, idx) =>
        idx === i ? { ...a, status: "running" } : a
      ));

      // Simulate log entries
      const logs = agentLogs[initialAgents[i].id];
      for (let j = 0; j < logs.length; j++) {
        await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
        setAgents(prev => prev.map((a, idx) =>
          idx === i ? { ...a, logs: logs.slice(0, j + 1) } : a
        ));
      }

      await new Promise(r => setTimeout(r, 300));

      // Set agent to completed
      setAgents(prev => prev.map((a, idx) =>
        idx === i ? { ...a, status: "completed" } : a
      ));
    }

    setCurrentAgentIndex(-1);
    setIsRunning(false);
  }, [transcript]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Input Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Upload className="h-5 w-5 text-primary" />
              Meeting Transcript
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your meeting transcript here..."
              className="min-h-[160px] resize-none bg-muted/30 border-border/50 rounded-xl text-sm"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <Button
                onClick={runWorkflow}
                disabled={isRunning || !transcript.trim()}
                className="gap-2 rounded-xl px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
              >
                {isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                {isRunning ? "Running Workflow..." : "Run Autonomous Workflow"}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl border-border/50"
                onClick={() => setTranscript(sampleTranscript)}
              >
                Load Sample
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Agent Pipeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <Card className="glass-card border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">Agent Execution Pipeline</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Connection line */}
            <div className="relative">
              <div className="hidden lg:block absolute top-8 left-0 right-0 h-0.5 bg-border/50 z-0 mx-[60px]" />

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">
                {agents.map((agent, i) => {
                  const Icon = agent.icon;
                  const isActive = agent.status === "running";
                  const isCompleted = agent.status === "completed";

                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <div
                        className={`agent-card ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
                      >
                        {/* Pulse ring when active */}
                        {isActive && (
                          <div className="absolute -inset-1 rounded-xl border-2 border-primary/40 animate-pulse-ring" />
                        )}

                        <div className="flex flex-col items-center text-center gap-3">
                          <div className={`p-3 rounded-xl border ${agent.color} transition-all duration-300`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-foreground">{agent.name}</p>
                            <Badge
                              className={`mt-1.5 text-[10px] uppercase tracking-wider ${
                                isActive
                                  ? "bg-primary/10 text-primary border-primary/20"
                                  : isCompleted
                                  ? "bg-success/10 text-success border-success/20"
                                  : "bg-muted text-muted-foreground border-border/50"
                              } border`}
                            >
                              {isActive ? "Running" : isCompleted ? "Completed" : "Idle"}
                            </Badge>
                          </div>
                        </div>

                        {/* Logs */}
                        <AnimatePresence>
                          {agent.logs.length > 0 && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              className="mt-3 pt-3 border-t border-border/50 w-full"
                            >
                              <div className="space-y-1 max-h-28 overflow-y-auto">
                                {agent.logs.map((log, j) => (
                                  <motion.p
                                    key={j}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-[11px] text-muted-foreground flex items-start gap-1.5"
                                  >
                                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-primary/50" />
                                    <span>{log}</span>
                                  </motion.p>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Completion check */}
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-2 -right-2 bg-success text-success-foreground rounded-full p-0.5"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </motion.div>
                        )}
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

export default RunWorkflow;
