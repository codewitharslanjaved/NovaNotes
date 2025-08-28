"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wind } from "lucide-react"

export function WeatherWidget() {
  const [weather, setWeather] = useState({
    location: "Space Station Alpha",
    temperature: -273,
    condition: "cosmic",
    humidity: 0,
    windSpeed: 299792458, // Speed of light
  })

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Simulate space weather changes
    const weatherTimer = setInterval(() => {
      const conditions = [
        { condition: "cosmic", temp: -273, icon: "🌌" },
        { condition: "solar storm", temp: 5778, icon: "☀️" },
        { condition: "nebula drift", temp: -200, icon: "🌫️" },
        { condition: "asteroid shower", temp: -100, icon: "☄️" },
        { condition: "quantum flux", temp: 0, icon: "⚡" },
      ]

      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
      setWeather((prev) => ({
        ...prev,
        ...randomCondition,
        temperature: randomCondition.temp,
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 1000000),
      }))
    }, 10000)

    return () => clearInterval(weatherTimer)
  }, [])

  const getWeatherIcon = () => {
    switch (weather.condition) {
      case "cosmic":
        return <div className="text-2xl">🌌</div>
      case "solar storm":
        return <div className="text-2xl">☀️</div>
      case "nebula drift":
        return <div className="text-2xl">🌫️</div>
      case "asteroid shower":
        return <div className="text-2xl">☄️</div>
      case "quantum flux":
        return <div className="text-2xl">⚡</div>
      default:
        return <div className="text-2xl">🌌</div>
    }
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-cyan-400/10 to-teal-400/10 rounded-2xl blur-sm"></div>

      <Card className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border-white/20 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-cyan-400 font-mono text-lg flex items-center gap-2">
            <Wind className="w-5 h-5" />
            SPACE WEATHER
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Time */}
          <div className="text-center">
            <div className="text-2xl font-mono text-white">{time.toLocaleTimeString()}</div>
            <div className="text-sm text-white/60 font-mono">{time.toLocaleDateString()}</div>
          </div>

          {/* Weather Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              {getWeatherIcon()}
              <div className="text-right">
                <div className="text-xl font-mono text-white">{weather.temperature}°K</div>
                <div className="text-sm text-white/60 capitalize">{weather.condition}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                <div className="text-white/60">Humidity</div>
                <div className="text-cyan-400 font-mono">{weather.humidity}%</div>
              </div>
              <div className="bg-white/5 rounded-lg p-2 border border-white/10">
                <div className="text-white/60">Solar Wind</div>
                <div className="text-cyan-400 font-mono">{weather.windSpeed.toLocaleString()} km/s</div>
              </div>
            </div>

            <div className="text-center text-xs text-white/50 font-mono">📡 {weather.location}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
