"use client"

import { useState, useEffect } from "react"
import { useTodo } from "./todo-context"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Command, Plus, Filter, Settings, Zap } from "lucide-react"

export function CommandPalette() {
  const { state, dispatch } = useTodo()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    if (state.showCommandPalette) {
      setIsOpen(true)
      dispatch({ type: "TOGGLE_COMMAND_PALETTE" })
    }
  }, [state.showCommandPalette, dispatch])

  const commands = [
    {
      id: "add-task",
      title: "Add New Mission",
      description: "Create a new task",
      icon: <Plus className="w-4 h-4" />,
      action: () => {
        setIsOpen(false)
        // Focus on input
        const input = document.querySelector('input[placeholder*="mission"]') as HTMLInputElement
        input?.focus()
      },
    },
    {
      id: "filter-all",
      title: "Show All Missions",
      description: "View all tasks",
      icon: <Filter className="w-4 h-4" />,
      action: () => {
        dispatch({ type: "SET_FILTER", payload: "all" })
        setIsOpen(false)
      },
    },
    {
      id: "filter-pending",
      title: "Show Active Missions",
      description: "View pending tasks",
      icon: <Filter className="w-4 h-4" />,
      action: () => {
        dispatch({ type: "SET_FILTER", payload: "pending" })
        setIsOpen(false)
      },
    },
    {
      id: "filter-completed",
      title: "Show Completed Missions",
      description: "View completed tasks",
      icon: <Filter className="w-4 h-4" />,
      action: () => {
        dispatch({ type: "SET_FILTER", payload: "completed" })
        setIsOpen(false)
      },
    },
    {
      id: "toggle-theme",
      title: "Toggle Theme",
      description: "Switch between Nebula and Galaxy modes",
      icon: <Settings className="w-4 h-4" />,
      action: () => {
        dispatch({ type: "TOGGLE_THEME" })
        setIsOpen(false)
      },
    },
    {
      id: "focus-mode",
      title: "Activate Focus Mode",
      description: "Enter distraction-free mode",
      icon: <Zap className="w-4 h-4" />,
      action: () => {
        dispatch({ type: "TOGGLE_FOCUS_MODE" })
        setIsOpen(false)
      },
    },
  ]

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-900/95 border-gray-700 backdrop-blur-md max-w-2xl p-0">
        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-gray-700">
            <Command className="w-5 h-5 text-cyan-400" />
            <Input
              placeholder="Search commands..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent text-white placeholder:text-white/50 focus:ring-0"
              autoFocus
            />
          </div>

          {/* Commands */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-white/50">No commands found</div>
            ) : (
              <div className="p-2">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    onClick={command.action}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors text-left"
                  >
                    <div className="text-cyan-400">{command.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{command.title}</div>
                      <div className="text-white/60 text-sm">{command.description}</div>
                    </div>
                    <Badge variant="outline" className="text-xs text-white/50 border-white/20">
                      {index === 0 ? "↵" : `⌘${index}`}
                    </Badge>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-700 text-xs text-white/50 text-center font-mono">
            Use ↑↓ to navigate • ↵ to select • ESC to close
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
