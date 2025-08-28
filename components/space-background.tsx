"use client"

import { useEffect, useRef } from "react"
import { useTodo } from "./todo-context"

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { state } = useTodo()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Enhanced particles with better variety
    const particles: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      twinklePhase: number
      color: string
      type: "star" | "comet" | "sparkle" | "distant"
      velocity?: { x: number; y: number }
      trail?: Array<{ x: number; y: number; opacity: number }>
      pulsePhase?: number
    }> = []

    // Optimized particle distribution
    for (let i = 0; i < 180; i++) {
      const rand = Math.random()
      const type = rand < 0.6 ? "star" : rand < 0.75 ? "distant" : rand < 0.9 ? "sparkle" : "comet"

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size:
          type === "comet"
            ? Math.random() * 3 + 1.5
            : type === "sparkle"
              ? Math.random() * 2 + 1
              : type === "distant"
                ? Math.random() * 0.8 + 0.3
                : Math.random() * 1.5 + 0.5,
        opacity: type === "distant" ? Math.random() * 0.4 + 0.1 : Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color:
          type === "comet" ? "#00FFFF" : type === "sparkle" ? "#FFD700" : type === "distant" ? "#B8860B" : "#FFFFFF",
        type,
        velocity:
          type === "comet"
            ? {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
              }
            : undefined,
        trail: type === "comet" ? [] : undefined,
        pulsePhase: type === "sparkle" ? Math.random() * Math.PI * 2 : undefined,
      })
    }

    // Enhanced nebula clouds for depth
    const nebulaClouds: Array<{
      x: number
      y: number
      size: number
      color: string
      opacity: number
      drift: { x: number; y: number }
      pulsePhase: number
    }> = []

    const nebulaColors =
      state.theme === "nebula"
        ? ["#8B5CF6", "#A855F7", "#C084FC", "#6366F1", "#00FFFF"]
        : ["#1E40AF", "#3B82F6", "#6366F1", "#8B5CF6", "#0EA5E9"]

    for (let i = 0; i < 8; i++) {
      nebulaClouds.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 100,
        color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
        opacity: Math.random() * 0.15 + 0.05,
        drift: {
          x: (Math.random() - 0.5) * 0.3,
          y: (Math.random() - 0.5) * 0.3,
        },
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    // Cosmic objects with better variety
    const cosmicObjects: Array<{
      x: number
      y: number
      size: number
      color: string
      speed: number
      angle: number
      type: "planet" | "galaxy" | "pulsar"
      rotation: number
      pulsePhase: number
    }> = []

    const objectColors = ["#8B5CF6", "#00FFFF", "#FF6B9D", "#00FF88", "#FFD700"]

    for (let i = 0; i < 5; i++) {
      const rand = Math.random()
      const type = rand < 0.5 ? "planet" : rand < 0.8 ? "galaxy" : "pulsar"

      cosmicObjects.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size:
          type === "galaxy"
            ? Math.random() * 60 + 40
            : type === "pulsar"
              ? Math.random() * 30 + 20
              : Math.random() * 35 + 20,
        color: objectColors[Math.floor(Math.random() * objectColors.length)],
        speed: Math.random() * 0.4 + 0.2,
        angle: Math.random() * Math.PI * 2,
        type,
        rotation: 0,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let animationId: number
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime: number) => {
      if (currentTime - lastTime < frameInterval) {
        animationId = requestAnimationFrame(animate)
        return
      }
      lastTime = currentTime

      // Enhanced gradient background with more depth
      const gradient = ctx.createRadialGradient(
        canvas.width * 0.3,
        canvas.height * 0.2,
        0,
        canvas.width * 0.7,
        canvas.height * 0.8,
        Math.max(canvas.width, canvas.height),
      )

      if (state.theme === "nebula") {
        gradient.addColorStop(0, "#0F0A1F")
        gradient.addColorStop(0.2, "#1A0B2E")
        gradient.addColorStop(0.4, "#2D1B4E")
        gradient.addColorStop(0.6, "#1E1B4B")
        gradient.addColorStop(0.8, "#0F0C29")
        gradient.addColorStop(1, "#000000")
      } else {
        gradient.addColorStop(0, "#000814")
        gradient.addColorStop(0.2, "#001D3D")
        gradient.addColorStop(0.4, "#003566")
        gradient.addColorStop(0.6, "#0F1419")
        gradient.addColorStop(0.8, "#000000")
        gradient.addColorStop(1, "#000000")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle atmospheric layers
      const atmosphereGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      atmosphereGradient.addColorStop(0, "rgba(0, 255, 255, 0.02)")
      atmosphereGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.03)")
      atmosphereGradient.addColorStop(1, "rgba(236, 72, 153, 0.02)")

      ctx.fillStyle = atmosphereGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Render nebula clouds first for depth
      nebulaClouds.forEach((cloud) => {
        cloud.x += cloud.drift.x
        cloud.y += cloud.drift.y
        cloud.pulsePhase += 0.01

        // Wrap around screen
        if (cloud.x > canvas.width + cloud.size) cloud.x = -cloud.size
        if (cloud.x < -cloud.size) cloud.x = canvas.width + cloud.size
        if (cloud.y > canvas.height + cloud.size) cloud.y = -cloud.size
        if (cloud.y < -cloud.size) cloud.y = canvas.height + cloud.size

        const pulse = Math.sin(cloud.pulsePhase) * 0.3 + 0.7

        ctx.save()
        ctx.globalAlpha = cloud.opacity * pulse

        const cloudGradient = ctx.createRadialGradient(cloud.x, cloud.y, 0, cloud.x, cloud.y, cloud.size)
        cloudGradient.addColorStop(0, `${cloud.color}40`)
        cloudGradient.addColorStop(0.5, `${cloud.color}20`)
        cloudGradient.addColorStop(1, "transparent")

        ctx.fillStyle = cloudGradient
        ctx.beginPath()
        ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Enhanced particle rendering
      particles.forEach((particle) => {
        particle.twinklePhase += particle.twinkleSpeed
        const twinkle = Math.sin(particle.twinklePhase) * 0.4 + 0.6

        if (particle.type === "sparkle" && particle.pulsePhase !== undefined) {
          particle.pulsePhase += 0.03
        }

        if (particle.type === "comet" && particle.velocity && particle.trail) {
          // Update comet position
          particle.x += particle.velocity.x
          particle.y += particle.velocity.y

          // Add to trail
          particle.trail.push({ x: particle.x, y: particle.y, opacity: 1 })
          if (particle.trail.length > 12) particle.trail.shift()

          // Update trail opacity
          particle.trail.forEach((point, index) => {
            point.opacity = index / particle.trail!.length
          })

          // Wrap around screen
          if (particle.x > canvas.width + 50) particle.x = -50
          if (particle.x < -50) particle.x = canvas.width + 50
          if (particle.y > canvas.height + 50) particle.y = -50
          if (particle.y < -50) particle.y = canvas.height + 50

          // Render comet trail with glow
          ctx.save()
          ctx.shadowBlur = 10
          ctx.shadowColor = particle.color
          particle.trail.forEach((point, index) => {
            if (index % 2 === 0) {
              ctx.globalAlpha = point.opacity * 0.7
              ctx.fillStyle = particle.color
              ctx.beginPath()
              ctx.arc(point.x, point.y, particle.size * 0.4, 0, Math.PI * 2)
              ctx.fill()
            }
          })
          ctx.restore()
        }

        // Enhanced particle rendering with different effects
        ctx.save()

        if (particle.type === "sparkle" && particle.pulsePhase !== undefined) {
          const pulse = Math.sin(particle.pulsePhase) * 0.5 + 0.5
          ctx.globalAlpha = particle.opacity * twinkle * pulse

          // Sparkle cross effect
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 1
          ctx.shadowBlur = 8
          ctx.shadowColor = particle.color

          const size = particle.size * (pulse + 0.5)
          ctx.beginPath()
          ctx.moveTo(particle.x - size, particle.y)
          ctx.lineTo(particle.x + size, particle.y)
          ctx.moveTo(particle.x, particle.y - size)
          ctx.lineTo(particle.x, particle.y + size)
          ctx.stroke()
        } else {
          ctx.globalAlpha = particle.opacity * twinkle
          ctx.fillStyle = particle.color

          if (particle.type === "distant") {
            // Subtle distant stars
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          } else {
            // Regular stars with subtle glow
            ctx.shadowBlur = particle.type === "comet" ? 0 : 5
            ctx.shadowColor = particle.color
            ctx.beginPath()
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.restore()
      })

      // Enhanced cosmic objects
      cosmicObjects.forEach((object) => {
        object.angle += object.speed * 0.008
        object.rotation += 0.01
        object.pulsePhase += 0.02
        object.x += Math.sin(object.angle) * 0.2
        object.y += Math.cos(object.angle) * 0.15

        // Wrap around screen
        if (object.x > canvas.width + object.size) object.x = -object.size
        if (object.x < -object.size) object.x = canvas.width + object.size
        if (object.y > canvas.height + object.size) object.y = -object.size
        if (object.y < -object.size) object.y = canvas.height + object.size

        ctx.save()

        if (object.type === "pulsar") {
          // Pulsing star effect
          const pulse = Math.sin(object.pulsePhase) * 0.4 + 0.6
          ctx.globalAlpha = 0.8 * pulse

          // Pulsar rings
          for (let i = 1; i <= 3; i++) {
            ctx.globalAlpha = (0.3 / i) * pulse
            ctx.strokeStyle = object.color
            ctx.lineWidth = 2 / i
            ctx.beginPath()
            ctx.arc(object.x, object.y, object.size * i * pulse, 0, Math.PI * 2)
            ctx.stroke()
          }

          // Central star
          ctx.globalAlpha = 0.9 * pulse
          ctx.fillStyle = object.color
          ctx.shadowBlur = 15
          ctx.shadowColor = object.color
          ctx.beginPath()
          ctx.arc(object.x, object.y, object.size * 0.3, 0, Math.PI * 2)
          ctx.fill()
        } else if (object.type === "galaxy") {
          // Enhanced galaxy with spiral arms
          ctx.translate(object.x, object.y)
          ctx.rotate(object.rotation)
          ctx.globalAlpha = 0.6

          const galaxyGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, object.size)
          galaxyGradient.addColorStop(0, object.color)
          galaxyGradient.addColorStop(0.3, `${object.color}80`)
          galaxyGradient.addColorStop(0.7, `${object.color}40`)
          galaxyGradient.addColorStop(1, "transparent")

          ctx.fillStyle = galaxyGradient

          // Multiple spiral arms
          for (let i = 0; i < 3; i++) {
            ctx.save()
            ctx.rotate((i * Math.PI * 2) / 3)
            ctx.beginPath()
            ctx.ellipse(0, 0, object.size * 0.8, object.size * 0.2, 0, 0, Math.PI * 2)
            ctx.fill()
            ctx.restore()
          }
        } else {
          // Enhanced planet with atmosphere
          ctx.globalAlpha = 0.7

          // Atmosphere glow
          const atmosphereGradient = ctx.createRadialGradient(
            object.x,
            object.y,
            object.size * 0.7,
            object.x,
            object.y,
            object.size * 1.4,
          )
          atmosphereGradient.addColorStop(0, "transparent")
          atmosphereGradient.addColorStop(1, `${object.color}30`)

          ctx.fillStyle = atmosphereGradient
          ctx.beginPath()
          ctx.arc(object.x, object.y, object.size * 1.4, 0, Math.PI * 2)
          ctx.fill()

          // Planet surface with lighting
          const planetGradient = ctx.createRadialGradient(
            object.x - object.size * 0.3,
            object.y - object.size * 0.3,
            0,
            object.x,
            object.y,
            object.size,
          )
          planetGradient.addColorStop(0, object.color)
          planetGradient.addColorStop(0.6, `${object.color}90`)
          planetGradient.addColorStop(1, `${object.color}30`)

          ctx.fillStyle = planetGradient
          ctx.beginPath()
          ctx.arc(object.x, object.y, object.size, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [state.theme])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" />
}
