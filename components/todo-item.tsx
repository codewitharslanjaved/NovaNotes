"use client"

import { useState } from "react"
import { useTodo, type Todo } from "./todo-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit2, Trash2, CalendarIcon, Save, X } from "lucide-react"
import { format, isToday, isPast } from "date-fns"

interface TodoItemProps {
  todo: Todo
}

export function TodoItem({ todo }: TodoItemProps) {
  const { dispatch, state } = useTodo()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editPriority, setEditPriority] = useState(todo.priority)
  const [editDueDate, setEditDueDate] = useState<Date | undefined>(todo.dueDate ? new Date(todo.dueDate) : undefined)

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_TODO", payload: todo.id })

    // Play completion sound
    if (state.soundEnabled && !todo.completed) {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      audio.play().catch(() => {})
    }
  }

  const handleDelete = () => {
    dispatch({ type: "DELETE_TODO", payload: todo.id })
  }

  const handleSave = () => {
    if (editText.trim()) {
      dispatch({
        type: "EDIT_TODO",
        payload: {
          id: todo.id,
          text: editText.trim(),
          priority: editPriority,
          dueDate: editDueDate?.toISOString(),
        },
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setEditPriority(todo.priority)
    setEditDueDate(todo.dueDate ? new Date(todo.dueDate) : undefined)
    setIsEditing(false)
  }

  const priorityColors = {
    low: "border-l-green-400 bg-green-400/10",
    medium: "border-l-yellow-400 bg-yellow-400/10",
    high: "border-l-red-400 bg-red-400/10",
  }

  const priorityIcons = {
    low: "🌟",
    medium: "⭐",
    high: "💫",
  }

  const isDueSoon = todo.dueDate && isToday(new Date(todo.dueDate))
  const isOverdue = todo.dueDate && isPast(new Date(todo.dueDate)) && !todo.completed

  return (
    <div
      className={`
      bg-white/10 backdrop-blur-sm rounded-xl p-4 border-l-4 border border-white/20
      ${priorityColors[todo.priority]}
      ${todo.completed ? "opacity-60" : ""}
      ${isDueSoon ? "ring-2 ring-yellow-400/50" : ""}
      ${isOverdue ? "ring-2 ring-red-400/50" : ""}
      transition-all duration-300 hover:bg-white/15
    `}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="mt-1 border-white/40 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
        />

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="bg-white/10 rounded-xl border-white/20 text-white"
                autoFocus
              />

              <div className="flex gap-2">
                <Select
                  value={editPriority}
                  onValueChange={(value: "low" | "medium" | "high") => setEditPriority(value)}
                >
                  <SelectTrigger className="w-32 bg-white/10 rounded-xl border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 rounded-xl border-gray-700">
                    <SelectItem value="low" className="text-green-400">
                      🌟 Low
                    </SelectItem>
                    <SelectItem value="medium" className="text-yellow-400">
                      ⭐ Medium
                    </SelectItem>
                    <SelectItem value="high" className="text-red-400">
                      💫 High
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="bg-white/10 rounded-xl border-white/20 text-white hover:bg-white/20">
                      <CalendarIcon className="w-4 h-4" />
                      {editDueDate ? format(editDueDate, "MMM dd") : "Due"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto rounded-xl p-0 bg-gray-900 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={editDueDate}
                      onSelect={setEditDueDate}
                      initialFocus
                      className="text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSave} size="sm" className="rounded-xl bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4" />
                </Button>
                <Button
                  onClick={handleCancel}
                  size="sm"
                  variant="outline"
                  className="border-white/20 rounded-xl text-white hover:bg-white/20 bg-transparent"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{priorityIcons[todo.priority]}</span>
                <span
                  className={`
                  text-white font-medium
                  ${todo.completed ? "line-through opacity-60" : ""}
                `}
                >
                  {todo.text}
                </span>
                {isDueSoon && !todo.completed && (
                  <span className="text-yellow-400 text-sm font-medium">📅 Due Today!</span>
                )}
                {isOverdue && <span className="text-red-400 text-sm font-medium">⚠️ Overdue</span>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-white/60">
                  {todo.dueDate && <span>📅 Due: {format(new Date(todo.dueDate), "MMM dd, yyyy")}</span>}
                  <span>Created: {format(new Date(todo.createdAt), "MMM dd")}</span>
                  {todo.completedAt && <span>✅ Completed: {format(new Date(todo.completedAt), "MMM dd")}</span>}
                </div>

                <div className="flex gap-1">
                  <Button
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    variant="ghost"
                    className="text-white/60 rounded-xl hover:text-white hover:bg-white/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleDelete}
                    size="sm"
                    variant="ghost"
                    className="text-red-400 rounded-xl hover:text-red-300 hover:bg-red-400/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
