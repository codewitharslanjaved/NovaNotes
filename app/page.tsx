"use client"

import { useState, useEffect } from "react"
import { TodoProvider } from "@/components/todo-context"
import { SpaceBackground } from "@/components/space-background"
import { TodoHeader } from "@/components/todo-header"
import { TodoInput } from "@/components/todo-input"
import { TodoFilters } from "@/components/todo-filters"
import { TodoList } from "@/components/todo-list"
import { AchievementSystem } from "@/components/achievement-system"
import { NotificationSystem } from "@/components/notification-system"
import { SoundToggle } from "@/components/sound-toggle"
import { CommandPalette } from "@/components/command-palette"
import { FocusMode } from "@/components/focus-mode"

export default function NovaNotesApp() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <TodoProvider>
      <div className="min-h-screen relative overflow-hidden">
        <SpaceBackground />

        {/* Simplified grid overlay */}
        <div className="fixed inset-0 opacity-3 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-8 max-w-5xl">
          <div className="space-y-10">
            <TodoHeader />
            <TodoInput />
            <TodoFilters />
            <TodoList />
          </div>
        </div>

        <AchievementSystem />
        <NotificationSystem />
        <SoundToggle />
        <CommandPalette />
        <FocusMode />
      </div>
    </TodoProvider>
  )
}
