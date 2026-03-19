import { Outlet, useLocation } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Circle, User, Menu } from "lucide-react";
import autoopsBg from "@/assets/autoops-bg.jpg";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/workflow": "Run Workflow",
  "/tasks": "Tasks",
  "/agents": "Agent Activity",
  "/audit": "Audit Logs",
};

export const AppLayout = () => {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "AutoOps";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative overflow-hidden">
        {/* Background image layer */}
        <div className="fixed inset-0 z-0">
          <img
            src={autoopsBg}
            alt=""
            className="w-full h-full object-cover opacity-[0.07]"
          />
          <div className="absolute inset-0 animated-bg opacity-90" />
        </div>

        {/* Floating particles */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${8 + Math.random() * 12}s`,
                animationDelay: `${Math.random() * 8}s`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}
        </div>

        <AppSidebar />

        <div className="flex-1 flex flex-col relative z-10">
          {/* Header */}
          <header className="h-16 flex items-center justify-between px-6 border-b border-border/50 bg-card/60 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={title}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-lg font-semibold text-foreground"
                >
                  {title}
                </motion.h1>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                <Circle className="h-2 w-2 fill-success text-success" />
                <span className="text-xs font-medium text-success">System Active</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-6"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
