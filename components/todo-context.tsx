"use client"

import React, { createContext, useContext, useReducer, useEffect } from "react"

export interface Todo {
  id: string
  text: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate?: string
  createdAt: string
  completedAt?: string
  category?: string
  isRecurring?: boolean
  estimatedTime?: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
}

interface TodoState {
  todos: Todo[]
  filter: "all" | "completed" | "pending"
  theme: "nebula" | "galaxy"
  achievements: Achievement[]
  soundEnabled: boolean
  dailyQuote: string
  showCommandPalette: boolean
  focusMode: boolean
}

type TodoAction =
  | { type: "ADD_TODO"; payload: Omit<Todo, "id" | "createdAt"> }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string }
  | {
      type: "EDIT_TODO"
      payload: {
        id: string
        text: string
        priority: Todo["priority"]
        dueDate?: string
        category?: string
        estimatedTime?: number
      }
    }
  | { type: "REORDER_TODOS"; payload: Todo[] }
  | { type: "SET_FILTER"; payload: TodoState["filter"] }
  | { type: "TOGGLE_THEME" }
  | { type: "UNLOCK_ACHIEVEMENT"; payload: string }
  | { type: "TOGGLE_SOUND" }
  | { type: "SET_DAILY_QUOTE"; payload: string }
  | { type: "LOAD_STATE"; payload: Partial<TodoState> }
  | { type: "TOGGLE_COMMAND_PALETTE" }
  | { type: "TOGGLE_FOCUS_MODE" }

const initialState: TodoState = {
  todos: [],
  filter: "all",
  theme: "nebula",
  achievements: [
    { id: "first-task", name: "First Mission", description: "Complete your first task", icon: "🚀", unlocked: false },
    { id: "task-master", name: "Task Master", description: "Complete 10 tasks", icon: "⭐", unlocked: false },
    { id: "constellation", name: "Constellation", description: "Complete 25 tasks", icon: "✨", unlocked: false },
    { id: "galaxy-explorer", name: "Galaxy Explorer", description: "Complete 50 tasks", icon: "🌌", unlocked: false },
    {
      id: "priority-pilot",
      name: "Priority Pilot",
      description: "Complete 5 high-priority tasks",
      icon: "🛸",
      unlocked: false,
    },
    {
      id: "time-traveler",
      name: "Time Traveler",
      description: "Complete a task on its due date",
      icon: "⏰",
      unlocked: false,
    },
    { id: "focus-master", name: "Focus Master", description: "Complete 5 focus sessions", icon: "🎯", unlocked: false },
    {
      id: "category-king",
      name: "Category King",
      description: "Complete tasks in all categories",
      icon: "👑",
      unlocked: false,
    },
  ],
  soundEnabled: true,
  dailyQuote: "The universe is not only stranger than we imagine, it is stranger than we can imagine.",
  showCommandPalette: false,
  focusMode: false,
}

const spaceQuotes = [
  "The universe is not only stranger than we imagine, it is stranger than we can imagine.",
  "We are all made of star stuff.",
  "The cosmos is within us. We are made of star-stuff.",
  "Space is big. You just won't believe how vastly, hugely, mind-bogglingly big it is.",
  "To infinity and beyond!",
  "The Earth is the cradle of humanity, but mankind cannot stay in the cradle forever.",
  "We choose to go to the moon not because it is easy, but because it is hard.",
  "The important thing is not to stop questioning.",
  "Somewhere, something incredible is waiting to be known.",
  "The universe is under no obligation to make sense to you.",
]

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case "ADD_TODO":
      const newTodo: Todo = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      return { ...state, todos: [newTodo, ...state.todos] }

    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                completed: !todo.completed,
                completedAt: !todo.completed ? new Date().toISOString() : undefined,
              }
            : todo,
        ),
      }

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      }

    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? {
                ...todo,
                text: action.payload.text,
                priority: action.payload.priority,
                dueDate: action.payload.dueDate,
                category: action.payload.category,
                estimatedTime: action.payload.estimatedTime,
              }
            : todo,
        ),
      }

    case "REORDER_TODOS":
      return { ...state, todos: action.payload }

    case "SET_FILTER":
      return { ...state, filter: action.payload }

    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "nebula" ? "galaxy" : "nebula" }

    case "UNLOCK_ACHIEVEMENT":
      return {
        ...state,
        achievements: state.achievements.map((achievement) =>
          achievement.id === action.payload
            ? { ...achievement, unlocked: true, unlockedAt: new Date().toISOString() }
            : achievement,
        ),
      }

    case "TOGGLE_SOUND":
      return { ...state, soundEnabled: !state.soundEnabled }

    case "SET_DAILY_QUOTE":
      return { ...state, dailyQuote: action.payload }

    case "LOAD_STATE":
      // Fully replace state with loaded state from localStorage
      return { ...(action.payload as TodoState) }

    case "TOGGLE_COMMAND_PALETTE":
      return { ...state, showCommandPalette: !state.showCommandPalette }

    case "TOGGLE_FOCUS_MODE":
      return { ...state, focusMode: !state.focusMode }

    default:
      return state
  }
}

const TodoContext = createContext<{
  state: TodoState
  dispatch: React.Dispatch<TodoAction>
} | null>(null)

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState)
  const [loaded, setLoaded] = React.useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedState = localStorage.getItem("space-todo-state")
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        dispatch({ type: "LOAD_STATE", payload: parsedState })
      } catch (error) {
        console.error("Failed to load saved state:", error)
      }
    }

    // Set daily quote
    const today = new Date().toDateString()
    const savedQuoteDate = localStorage.getItem("space-todo-quote-date")

    if (savedQuoteDate !== today) {
      const randomQuote = spaceQuotes[Math.floor(Math.random() * spaceQuotes.length)]
      dispatch({ type: "SET_DAILY_QUOTE", payload: randomQuote })
      localStorage.setItem("space-todo-quote-date", today)
    }
    setLoaded(true)
  }, [])

  // Save state to localStorage whenever it changes, but only after loaded
  useEffect(() => {
    if (loaded && typeof window !== "undefined") {
      localStorage.setItem("space-todo-state", JSON.stringify(state))
    }
  }, [state, loaded])

  // Check for achievements
  useEffect(() => {
    const completedTodos = state.todos.filter((todo) => todo.completed)
    const highPriorityCompleted = completedTodos.filter((todo) => todo.priority === "high")
    const categories = Array.from(new Set(state.todos.map((todo) => todo.category)))

    // First task achievement
    if (completedTodos.length >= 1 && !state.achievements.find((a) => a.id === "first-task")?.unlocked) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "first-task" })
    }

    // Task master achievement
    if (completedTodos.length >= 10 && !state.achievements.find((a) => a.id === "task-master")?.unlocked) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "task-master" })
    }

    // Constellation achievement
    if (completedTodos.length >= 25 && !state.achievements.find((a) => a.id === "constellation")?.unlocked) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "constellation" })
    }

    // Galaxy explorer achievement
    if (completedTodos.length >= 50 && !state.achievements.find((a) => a.id === "galaxy-explorer")?.unlocked) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "galaxy-explorer" })
    }

    // Priority pilot achievement
    if (highPriorityCompleted.length >= 5 && !state.achievements.find((a) => a.id === "priority-pilot")?.unlocked) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "priority-pilot" })
    }

    // Time traveler achievement
    const todayCompleted = completedTodos.find((todo) => {
      if (!todo.dueDate || !todo.completedAt) return false
      const dueDate = new Date(todo.dueDate).toDateString()
      const completedDate = new Date(todo.completedAt).toDateString()
      return dueDate === completedDate
    })

    if (todayCompleted && !state.achievements.find((a) => a.id === "time-traveler")?.unlocked) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "time-traveler" })
    }

    // Focus master achievement
    if (
      state.focusMode &&
      completedTodos.length >= 5 &&
      !state.achievements.find((a) => a.id === "focus-master")?.unlocked
    ) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "focus-master" })
    }

    // Category king achievement
    if (categories.length >= 3 && !state.achievements.find((a) => a.id === "category-king")?.unlocked) {
      dispatch({ type: "UNLOCK_ACHIEVEMENT", payload: "category-king" })
    }
  }, [state.todos, state.achievements, state.focusMode])

  // Only render children after state is loaded
  return <TodoContext.Provider value={{ state, dispatch }}>{children}</TodoContext.Provider>
}

export function useTodo() {
  const context = useContext(TodoContext)
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider")
  }
  return context
}
