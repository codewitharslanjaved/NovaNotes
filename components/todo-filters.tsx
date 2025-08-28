"use client"

import { useTodo } from "./todo-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function TodoFilters() {
  const { state, dispatch } = useTodo()

  const filters = [
    {
      key: "all" as const,
      label: "ALL MISSIONS",
      icon: "🌌",
      count: state.todos.length,
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-400/30",
      text: "text-blue-400",
    },
    {
      key: "pending" as const,
      label: "ACTIVE",
      icon: "🚀",
      count: state.todos.filter((t) => !t.completed).length,
      gradient: "from-orange-500/20 to-yellow-500/20",
      border: "border-orange-400/30",
      text: "text-orange-400",
    },
    {
      key: "completed" as const,
      label: "COMPLETED",
      icon: "✨",
      count: state.todos.filter((t) => t.completed).length,
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-400/30",
      text: "text-green-400",
    },
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-8">
      {filters.map((filter) => (
        <div key={filter.key} className="relative group">
          {/* Glow effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${filter.gradient} rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          ></div>

          <Button
            onClick={() => dispatch({ type: "SET_FILTER", payload: filter.key })}
            variant={state.filter === filter.key ? "default" : "outline"}
            className={`
              relative h-14 px-8 rounded-2xl font-mono tracking-wider transition-all duration-300 backdrop-blur-md
              ${
                state.filter === filter.key
                  ? `bg-gradient-to-r ${filter.gradient} ${filter.text} border-transparent shadow-lg`
                  : `bg-white/5 ${filter.border} text-white/80 hover:bg-white/10 hover:${filter.text}`
              }
            `}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{filter.icon}</span>
                <span className="text-sm font-bold">{filter.label}</span>
                <Badge
                  variant="outline"
                  className={`text-xs ${state.filter === filter.key ? "border-current/30" : "border-white/20"} bg-transparent`}
                >
                  {filter.count}
                </Badge>
            </div>
          </Button>
        </div>
      ))}
    </div>
  )
}
