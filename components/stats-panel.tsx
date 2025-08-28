"use client"

import { useTodo } from "./todo-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Target, Clock, Zap } from "lucide-react"

export function StatsPanel() {
  const { state } = useTodo()

  const totalTasks = state.todos.length
  const completedTasks = state.todos.filter((t) => t.completed).length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const todayTasks = state.todos.filter((t) => {
    if (!t.dueDate) return false
    const today = new Date().toDateString()
    return new Date(t.dueDate).toDateString() === today
  })

  const highPriorityTasks = state.todos.filter((t) => t.priority === "high" && !t.completed).length

  const categories = ["personal", "work", "health", "learning", "creative", "social"]
  const categoryStats = categories.map((cat) => ({
    name: cat,
    count: state.todos.filter((t) => t.category === cat).length,
    completed: state.todos.filter((t) => t.category === cat && t.completed).length,
  }))

  const totalEstimatedTime = state.todos.filter((t) => !t.completed).reduce((acc, t) => acc + (t.estimatedTime || 0), 0)

  return (
    <div className="space-y-6">
      {/* Mission Control Panel */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-pink-400/10 rounded-2xl blur-sm"></div>

        <Card className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 font-mono text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              MISSION CONTROL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Overall Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Mission Progress</span>
                <span className="text-cyan-400 font-mono">{completionRate.toFixed(1)}%</span>
              </div>
              <Progress value={completionRate} className="h-2 bg-white/10" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-green-400">{completedTasks}</div>
                <div className="text-xs text-white/60">Completed</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <div className="text-2xl font-bold text-yellow-400">{totalTasks - completedTasks}</div>
                <div className="text-xs text-white/60">Remaining</div>
              </div>
            </div>

            {/* Today's Focus */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Target className="w-4 h-4" />
                Today's Missions
              </div>
              <Badge variant="outline" className="text-purple-400 border-purple-400/50">
                {todayTasks.length} tasks due
              </Badge>
            </div>

            {/* High Priority Alert */}
            {highPriorityTasks > 0 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <Zap className="w-4 h-4" />
                  {highPriorityTasks} Critical Missions
                </div>
              </div>
            )}

            {/* Estimated Time */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Clock className="w-4 h-4" />
                Estimated Time Remaining
              </div>
              <div className="text-lg font-mono text-cyan-400">
                {Math.floor(totalEstimatedTime / 60)}h {totalEstimatedTime % 60}m
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-cyan-400/10 rounded-2xl blur-sm"></div>

        <Card className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border-white/20 shadow-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-400 font-mono text-lg">SECTOR ANALYSIS</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {categoryStats
              .filter((cat) => cat.count > 0)
              .map((cat) => (
                <div key={cat.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70 capitalize">{cat.name}</span>
                    <span className="text-white/50">
                      {cat.completed}/{cat.count}
                    </span>
                  </div>
                  <Progress
                    value={cat.count > 0 ? (cat.completed / cat.count) * 100 : 0}
                    className="h-1.5 bg-white/10"
                  />
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
