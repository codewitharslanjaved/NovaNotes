"use client"

import { useTodo } from "./todo-context"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, Play, Pause, RotateCcw } from "lucide-react"
import { useState, useEffect } from "react"

export function FocusMode() {
  const { state, dispatch } = useTodo()
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [currentTask, setCurrentTask] = useState<string>("")

  const activeTasks = state.todos.filter((t) => !t.completed)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
      // Play completion sound
      if (state.soundEnabled) {
        const audio = new Audio(
          "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
        )
        audio.play().catch(() => {})
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, state.soundEnabled])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100

  const resetTimer = () => {
    setTimeLeft(25 * 60)
    setIsRunning(false)
  }

  if (!state.focusMode) return null

  return (
    <Dialog open={state.focusMode} onOpenChange={() => dispatch({ type: "TOGGLE_FOCUS_MODE" })}>
      <DialogContent className="bg-purple-900/20 !rounded-xl border-gray-700 backdrop-blur-md max-w-md">
        <div className="relative p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-cyan-400 font-mono mb-2">🎯 FOCUS MODE</h2>
            <p className="text-white/60 text-sm">Deep work session in progress</p>
          </div>

          {/* Timer */}
          <div className="text-center mb-8">
            <div className="text-6xl font-mono text-white mb-4">{formatTime(timeLeft)}</div>
            <Progress value={progress} className="h-2 bg-white/10 mb-4" />
            <div className="text-sm text-white/60">{timeLeft === 0 ? "Session Complete!" : "Focus Session"}</div>
          </div>

          {/* Current Task */}
          <div className="mb-6">
            <label className="block text-sm text-white/70 mb-2">Current Mission:</label>
            <select
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl p-2 text-white"
            >
              <option value="">Select a task...</option>
              {activeTasks.map((task) => (
                <option key={task.id} value={task.id} className="bg-gray-800">
                  {task.text}
                </option>
              ))}
            </select>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3">
            <Button
              onClick={() => setIsRunning(!isRunning)}
              disabled={timeLeft === 0}
              className="bg-gradient-to-r rounded-xl from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            <Button
              onClick={resetTimer}
              variant="outline"
              className="border-white/20 rounded-xl text-white hover:bg-white/10 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Tips */}
          <div className="mt-6 p-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xs text-white/60 text-center">
              💡 Tip: Use the Pomodoro technique - 25 minutes of focused work followed by a 5-minute break
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
