"use client"

import { useTodo } from "./todo-context"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"

export function SoundToggle() {
  const { state, dispatch } = useTodo()

  return (
    <Button
      onClick={() => dispatch({ type: "TOGGLE_SOUND" })}
      className="fixed bottom-4 left-4 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-full w-12 h-12"
      size="sm"
    >
      {state.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </Button>
  )
}
