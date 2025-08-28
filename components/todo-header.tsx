"use client"

import { useTodo } from "./todo-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Zap, Command, BarChart3, Sparkles } from "lucide-react"

export function TodoHeader() {
  const { state, dispatch } = useTodo()

  const totalTasks = state.todos.length
  const completedTasks = state.todos.filter((t) => t.completed).length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div className="text-center mb-12">
      {/* Enhanced Control Panel */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Button
              onClick={() => dispatch({ type: "TOGGLE_COMMAND_PALETTE" })}
              variant="outline"
              size="sm"
              className="relative bg-gradient-to-r rounded-xl from-cyan-500/10 to-blue-500/10 border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400/60 backdrop-blur-md shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 group"
            >
              <Command className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              <span className="ml-2 hidden sm:inline font-mono tracking-wider">CTRL+K</span>
            </Button>
          </div>

          {/* Enhanced Quick Stats */}
          <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-white/8 to-white/12 backdrop-blur-md rounded-xl px-5 py-3 border border-white/25 shadow-lg">
            <div className="relative">
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-white/90 font-mono text-sm tracking-wide">
              {completedTasks}/{totalTasks}
            </span>
            <div className="w-px h-4 bg-white/20"></div>
            <span className="text-cyan-400 font-mono text-sm font-bold">{completionRate.toFixed(0)}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Button
              onClick={() => dispatch({ type: "TOGGLE_FOCUS_MODE" })}
              variant="outline"
              size="sm"
              className="relative bg-gradient-to-r rounded-xl from-purple-500/10 to-pink-500/10 border-purple-400/40 text-purple-400 hover:bg-purple-400/20 hover:border-purple-400/60 backdrop-blur-md shadow-lg hover:shadow-purple-400/30 transition-all duration-300 group"
            >
              <Zap className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden sm:inline font-mono tracking-wider">FOCUS</span>
            </Button>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/15 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <Button
              onClick={() => dispatch({ type: "TOGGLE_THEME" })}
              variant="outline"
              size="sm"
              className="relative bg-gradient-to-r rounded-xl from-white/8 to-white/12 border-white/25 text-white hover:bg-white/20 hover:border-white/35 backdrop-blur-md shadow-lg transition-all duration-300 group"
            >
              {state.theme === "nebula" ? (
                <Moon className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              ) : (
                <Sun className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              )}
              <span className="hidden sm:inline font-mono tracking-wider">
                {state.theme === "nebula" ? "GALAXY" : "NEBULA"}
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Main Title Section */}
      <div className="relative mb-10">
        {/* Multi-layered holographic effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/15 via-purple-400/25 to-pink-400/15 blur-2xl animate-pulse"></div>
        <div
          className="absolute inset-0 bg-gradient-to-l from-cyan-400/10 via-transparent to-pink-400/10 blur-xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-400/5 to-transparent blur-lg animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Enhanced title with better spacing and effects */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 font-space tracking-wider drop-shadow-2xl">
            <span className="mx-2">NOVA</span>
            <span className="text-6xl md:text-7xl bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              NOTES
            </span>
          </h1>

          {/* Floating accent elements */}
          <div className="absolute -top-4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
          <div
            className="absolute -bottom-2 right-1/3 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 -left-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Enhanced subtitle with better hierarchy */}
        <div className="relative mt-6">
          <div className="text-cyan-400/95 text-xl font-mono mb-3 tracking-[0.4em] uppercase font-semibold">
            [ STELLAR PRODUCTIVITY SYSTEM ]
          </div>
          <div className="flex items-center justify-center gap-4 text-white/70 text-sm font-mono tracking-widest">
            <span>MISSION CONTROL</span>
            <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>
              STARDATE {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, "0")}.
              {String(new Date().getDate()).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Enhanced scanning effects */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-scan-line"></div>
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 animate-scan-line"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Enhanced Daily Quote Panel */}
      <div className="relative max-w-4xl mx-auto">
        {/* Multi-layered background with depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/12 via-purple-500/18 to-pink-500/12 rounded-3xl blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-white/12 rounded-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-3xl"></div>

      </div>
    </div>
  )
}
