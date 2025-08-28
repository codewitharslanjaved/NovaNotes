"use client"

import { useState, useEffect } from "react"
import { useTodo } from "./todo-context"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

export function AchievementSystem() {
  const { state } = useTodo()
  const [showNotification, setShowNotification] = useState<string | null>(null)
  const [lastUnlockedCount, setLastUnlockedCount] = useState(0)

  const unlockedAchievements = state.achievements.filter((a) => a.unlocked)
  const totalAchievements = state.achievements.length

  useEffect(() => {
    const currentUnlockedCount = unlockedAchievements.length
    if (currentUnlockedCount > lastUnlockedCount) {
      const newlyUnlocked = unlockedAchievements.find(
        (a) => a.unlockedAt && new Date(a.unlockedAt).getTime() > Date.now() - 1000,
      )
      if (newlyUnlocked) {
        setShowNotification(newlyUnlocked.id)
        setTimeout(() => setShowNotification(null), 5000)
      }
    }
    setLastUnlockedCount(currentUnlockedCount)
  }, [unlockedAchievements.length, lastUnlockedCount, unlockedAchievements])

  return (
    <>
      {/* Achievement Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-500">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎉</div>
              <div>
                <p className="font-bold">Achievement Unlocked!</p>
                <p className="text-sm opacity-90">{state.achievements.find((a) => a.id === showNotification)?.name}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievement Button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-4 right-4 bg-blue-500/10 backdrop-blur-md hover:bg-blue-600/10 border border-blue-500 transition-all to- text-white rounded-xl w-14 h-14 shadow-lg"
            size="sm"
          >
            <Trophy className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-purple-900/20 backdrop-blur-lg !rounded-xl border-gray-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🏆 Cosmic Achievements
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center">
              <Badge variant="outline" className="border-purple-400 text-purple-400">
                {unlockedAchievements.length} / {totalAchievements} Unlocked
              </Badge>
            </div>

            <div className="space-y-3 max-h-96  overflow-y-auto">
              {state.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`
                    p-3 rounded-xl border  transition-all duration-300
                    ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/50"
                        : "bg-gray-800/50 border-gray-600"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${achievement.unlocked ? "text-white" : "text-gray-400"}`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${achievement.unlocked ? "text-white/80" : "text-gray-500"}`}>
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-xs text-purple-400 mt-1">
                          Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
