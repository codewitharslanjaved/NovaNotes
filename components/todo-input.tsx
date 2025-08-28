"use client"

import type React from "react"
import { useState } from "react"
import { useTodo } from "./todo-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Rocket, Tag, Repeat, Clock, Sparkles, Zap } from "lucide-react"
import { format } from "date-fns"

export function TodoInput() {
  const { dispatch, state } = useTodo()
  const [text, setText] = useState("")
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [dueDate, setDueDate] = useState<Date>()
  const [category, setCategory] = useState<string>("personal")
  const [isRecurring, setIsRecurring] = useState(false)
  const [estimatedTime, setEstimatedTime] = useState<number>(30)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    dispatch({
      type: "ADD_TODO",
      payload: {
        text: text.trim(),
        completed: false,
        priority,
        dueDate: dueDate?.toISOString(),
        category,
        isRecurring,
        estimatedTime,
      },
    })

    // Enhanced sound effect
    if (state.soundEnabled) {
      const audio = new Audio(
        "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT",
      )
      audio.play().catch(() => {})
    }

    setText("")
    setPriority("medium")
    setDueDate(undefined)
    setCategory("personal")
    setIsRecurring(false)
    setEstimatedTime(30)
  }

  const categories = [
    { value: "personal", label: "🏠 Personal", color: "bg-blue-500/20 text-blue-400 border-blue-400/40" },
    { value: "work", label: "💼 Work", color: "bg-green-500/20 text-green-400 border-green-400/40" },
    { value: "health", label: "💪 Health", color: "bg-red-500/20 text-red-400 border-red-400/40" },
    { value: "learning", label: "📚 Learning", color: "bg-purple-500/20 text-purple-400 border-purple-400/40" },
    { value: "creative", label: "🎨 Creative", color: "bg-pink-500/20 text-pink-400 border-pink-400/40" },
    { value: "social", label: "👥 Social", color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/40" },
  ]

  return (
    <div className="relative mb-12">
      {/* Enhanced multi-layered holographic border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/25 to-pink-400/20 rounded-3xl blur-xl animate-pulse"></div>
      <div
        className="absolute inset-0 bg-gradient-to-l from-cyan-400/10 via-transparent to-pink-400/10 rounded-3xl blur-lg animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-400/8 to-transparent rounded-3xl blur-md animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-gradient-to-br from-white/8 via-white/12 to-white/8 backdrop-blur-xl rounded-3xl p-10 border border-white/25 shadow-2xl"
      >
        {/* Enhanced scanning lines */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-scan-line"></div>
        <div
          className="absolute top-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-scan-line"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="space-y-8">
          {/* Enhanced Header */}
          <div className="text-center mb-8">
            <div className="relative">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-mono tracking-wider mb-3">
                MISSION INITIALIZATION
              </h2>
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-cyan-400"></div>
              <div className="relative">
                <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
                <div className="absolute inset-0 w-5 h-5 bg-cyan-400 rounded-full blur-md opacity-30 animate-pulse"></div>
              </div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-cyan-400"></div>
            </div>
          </div>

          {/* Enhanced main input */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-all duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

            <Input
              type="text"
              placeholder="Enter new mission plan..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="relative py-4 px-4 bg-transparent border-cyan-400/40 text-white placeholder:text-white/60 focus:border-cyan-400 focus:ring-cyan-400/30 h-18 text-lg font-mono pr-20 rounded-2xl backdrop-blur-sm transition-all duration-300 shadow-lg"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-cyan-400/70 group-focus-within:text-cyan-400 transition-colors duration-300">
              <div className="relative">
                <Rocket className="w-7 h-7" />
                <div className="absolute inset-0 w-7 h-7 bg-cyan-400 rounded-full blur-lg opacity-0 group-focus-within:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* Enhanced options grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Priority with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-yellow-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                <SelectTrigger className="relative bg-white/8 border-white/25 text-white hover:border-purple-400/60 h-14 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-gray-700 backdrop-blur-xl rounded-xl shadow-2xl">
                  <SelectItem
                    value="low"
                    className="text-green-400 hover:bg-green-400/15 rounded-lg transition-colors duration-200"
                  >
                    🌟 Low Priority
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    className="text-yellow-400 hover:bg-yellow-400/15 rounded-lg transition-colors duration-200"
                  >
                    ⭐ Medium Priority
                  </SelectItem>
                  <SelectItem
                    value="high"
                    className="text-red-400 hover:bg-red-400/15 rounded-lg transition-colors duration-200"
                  >
                    💫 High Priority
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="relative bg-white/8 border-white/25 text-white hover:border-purple-400/60 h-14 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg">
                  <Tag className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-gray-700 backdrop-blur-xl rounded-xl shadow-2xl">
                  {categories.map((cat) => (
                    <SelectItem
                      key={cat.value}
                      value={cat.value}
                      className="hover:bg-white/10 rounded-lg transition-colors duration-200"
                    >
                      <Badge variant="outline" className={`${cat.color} shadow-sm`}>
                        {cat.label}
                      </Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Due Date with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative bg-white/8 border-white/25 text-white hover:bg-white/12 hover:border-cyan-400/60 justify-start h-14 rounded-xl backdrop-blur-sm w-full transition-all duration-300 shadow-lg"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {dueDate ? format(dueDate, "MMM dd") : "Due Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-900/95 border-gray-700 backdrop-blur-xl rounded-xl shadow-2xl">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="text-white rounded-xl"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Estimated Time with enhanced styling */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-500/10 rounded-xl blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Select
                value={estimatedTime.toString()}
                onValueChange={(value) => setEstimatedTime(Number.parseInt(value))}
              >
                <SelectTrigger className="relative bg-white/8 border-white/25 text-white hover:border-purple-400/60 h-14 rounded-xl backdrop-blur-sm transition-all duration-300 shadow-lg">
                  <Clock className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900/95 border-gray-700 backdrop-blur-xl rounded-xl shadow-2xl">
                  <SelectItem value="15" className="rounded-lg hover:bg-white/10 transition-colors duration-200">
                    ⚡ 15 min
                  </SelectItem>
                  <SelectItem value="30" className="rounded-lg hover:bg-white/10 transition-colors duration-200">
                    🕐 30 min
                  </SelectItem>
                  <SelectItem value="60" className="rounded-lg hover:bg-white/10 transition-colors duration-200">
                    ⏰ 1 hour
                  </SelectItem>
                  <SelectItem value="120" className="rounded-lg hover:bg-white/10 transition-colors duration-200">
                    ⏳ 2 hours
                  </SelectItem>
                  <SelectItem value="240" className="rounded-lg hover:bg-white/10 transition-colors duration-200">
                    📅 4 hours
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enhanced action buttons */}
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsRecurring(!isRecurring)}
                  className={`
                    text-white/80 hover:text-white hover:bg-white/12 rounded-xl transition-all duration-300 px-6 py-3
                    ${isRecurring ? "bg-purple-500/25 text-purple-400 border border-purple-400/40 shadow-lg shadow-purple-400/20" : ""}
                  `}
                >
                  <Repeat className="w-4 h-4 mr-2" />
                  Recurring Mission
                </Button>
              </div>
            </div>


              <Button
                type="submit"
                className="relative border border-blue-500 bg-blue-500/40 hover:bg-blue-900/40 backdro-blur-lg text-white font-mono px-12 py-4 rounded-2xl  transition-all duration-300 h-14 group"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">LAUNCH MISSION</span>
                </div>
              </Button>
          </div>
        </div>

        {/* Enhanced corner decorations with glow effects */}
        <div className="absolute top-5 left-5 w-10 h-10 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-xl shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute top-5 right-5 w-10 h-10 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-xl shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute bottom-5 left-5 w-10 h-10 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-xl shadow-lg shadow-cyan-400/20"></div>
        <div className="absolute bottom-5 right-5 w-10 h-10 border-r-2 border-b-2 border-cyan-400/60 rounded-br-xl shadow-lg shadow-cyan-400/20"></div>

        {/* Floating accent dots */}
        <div className="absolute top-8 left-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div
          className="absolute bottom-8 right-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-40"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 right-8 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-50"
          style={{ animationDelay: "2s" }}
        ></div>
      </form>
    </div>
  )
}
