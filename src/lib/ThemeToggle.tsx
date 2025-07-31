"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"

function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark"
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", newTheme)
    setIsDark(!isDark)
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 flex flex-col w-8 h-16 p-1 rounded-full cursor-pointer transition-all duration-300",
        isDark
          ? "bg-zinc-950 border border-zinc-800"
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
    >
      <div className="relative w-full h-full">
        {/* Sol */}
        <div
          className={cn(
            "absolute w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300",
            isDark ? "translate-y-[2rem]" : "translate-y-0",
            "bg-gray-200"
          )}
        >
          <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
        </div>

        {/* Luna */}
        <div
          className={cn(
            "absolute w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300",
            isDark ? "translate-y-0" : "translate-y-[2rem]",
            "bg-zinc-800"
          )}
        >
          <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  )
}

export default ThemeToggle
