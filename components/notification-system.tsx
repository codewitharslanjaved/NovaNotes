"use client"

import { useEffect, useState } from "react"
import { useTodo } from "./todo-context"
import { isToday, isPast } from "date-fns"

export function NotificationSystem() {
  const { state } = useTodo()
  const [notifications, setNotifications] = useState<
    Array<{
      id: string
      message: string
      type: "due" | "overdue"
    }>
  >([])

  useEffect(() => {
    const checkNotifications = () => {
      const newNotifications: Array<{
        id: string
        message: string
        type: "due" | "overdue"
      }> = []

      state.todos.forEach((todo) => {
        if (todo.completed || !todo.dueDate) return

        const dueDate = new Date(todo.dueDate)

        if (isToday(dueDate)) {
          newNotifications.push({
            id: `due-${todo.id}`,
            message: `📅 "${todo.text}" is due today!`,
            type: "due",
          })
        } else if (isPast(dueDate)) {
          newNotifications.push({
            id: `overdue-${todo.id}`,
            message: `⚠️ "${todo.text}" is overdue!`,
            type: "overdue",
          })
        }
      })

      setNotifications(newNotifications)
    }

    checkNotifications()
    const interval = setInterval(checkNotifications, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [state.todos])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 left-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            p-3 rounded-xl shadow-lg border backdrop-blur-sm cursor-pointer
            transition-all duration-300 hover:scale-105
            ${
              notification.type === "due"
                ? "bg-yellow-500/20 border-yellow-400/50 text-yellow-100"
                : "bg-red-500/20 border-red-400/50 text-red-100"
            }
          `}
          onClick={() => removeNotification(notification.id)}
        >
          <p className="text-sm font-medium">{notification.message}</p>
          <p className="text-xs opacity-75 mt-1">Click to dismiss</p>
        </div>
      ))}
    </div>
  )
}
