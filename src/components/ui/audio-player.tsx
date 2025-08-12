"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  audioSrc?: string
  speakerName?: string
  speakerAvatar?: string
  barsCount?: number
}

export function AudioPlayer({
  audioSrc = "/assets/radio37.mp3",
  speakerName = "Radio 37 Gral Pico . Una mañana de locos . Conducción Daniel De Paulo",
  speakerAvatar = "/assets/speakers/cara/nicolas-de-paulo.jpg",
  barsCount = 48,
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const animationRef = useRef<number | null>(null)
  const isPlayingRef = useRef(false)

  // refs for bar DOM nodes
  const barsRef = useRef<Array<HTMLDivElement | null>>(Array(barsCount).fill(null))

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => setDuration(audio.duration || 0)
    const onTime = () => setCurrentTime(audio.currentTime || 0)
    const onEnded = () => {
      setIsPlaying(false)
      isPlayingRef.current = false
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }

    audio.addEventListener("loadedmetadata", onLoaded)
    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnded)

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded)
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("ended", onEnded)
    }
  }, [])

  // initialize audio context & analyser (only once)
  const initializeAudioContext = async () => {
    if (audioContextRef.current) return
    const audio = audioRef.current
    if (!audio) return

    try {
      // allow crossOrigin if loading remote audio
      audio.crossOrigin = "anonymous"

      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext
      const audioCtx = new AudioCtx()

      // create nodes
      const analyser = audioCtx.createAnalyser()
      // fftSize must be power of two; higher -> more freq bins
      analyser.fftSize = 256 // frequencyBinCount = 128
      analyser.smoothingTimeConstant = 0.75

      // create source node from the <audio>
      const source = audioCtx.createMediaElementSource(audio)

      // connect chain: source -> analyser -> destination
      source.connect(analyser)
      analyser.connect(audioCtx.destination)

      audioContextRef.current = audioCtx
      analyserRef.current = analyser
      sourceRef.current = source
    } catch (err) {
      console.error("Failed to init AudioContext:", err)
    }
  }

  // animation loop: read frequency data and update bars DOM
  const animateBars = () => {
    const analyser = analyserRef.current
    if (!analyser) return

    const bufferLength = analyser.frequencyBinCount // e.g. 128
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      // stop if not playing
      if (!isPlayingRef.current) return

      analyser.getByteFrequencyData(dataArray)

      // group frequency bins into the number of bars
      const groupSize = Math.floor(bufferLength / barsCount) || 1

      for (let i = 0; i < barsCount; i++) {
        const start = i * groupSize
        let end = start + groupSize
        if (end > bufferLength) end = bufferLength

        let sum = 0
        for (let j = start; j < end; j++) sum += dataArray[j]
        const avg = sum / (end - start || 1)
        const percent = avg / 255 // 0..1

        const minH = 6 // pct
        const heightPct = Math.max(minH, Math.round(percent * 100))

        const barEl = barsRef.current[i]
        if (barEl) {
          // height in % relative to container
          barEl.style.height = `${heightPct}%`
          // dynamic blue color (más claro cuando más alto)
          const lightness = 30 + Math.round(percent * 50) // from 30% to ~80%
          barEl.style.background = `hsl(210, 90%, ${lightness}%)`
          // small glow effect
          barEl.style.boxShadow = `0 0 ${2 + percent * 6}px rgba(59,130,246,${0.2 + percent * 0.6})`
        }
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    // kick off loop
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    animationRef.current = requestAnimationFrame(draw)
  }

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      await initializeAudioContext()

      // resume audio context if suspended (user gesture already)
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume()
      }

      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
        isPlayingRef.current = false
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
      } else {
        // try to play; promise might reject if not user gesture
        await audio.play()
        setIsPlaying(true)
        isPlayingRef.current = true
        // start animation only when bars DOM exists
        // slight delay to ensure refs are populated (should be immediate)
        requestAnimationFrame(() => animateBars())
      }
    } catch (err) {
      console.error("Play/pause error:", err)
      setIsPlaying(false)
      isPlayingRef.current = false
    }
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    const newTime = (value[0] / 100) * duration
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    const newVolume = value[0] / 100
    setVolume(newVolume)
    audio.volume = newVolume
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  useEffect(() => {
    // cleanup on unmount
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      try {
        sourceRef.current?.disconnect()
      } catch {}
      try {
        analyserRef.current?.disconnect()
      } catch {}
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close()
        } catch {}
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
  <CardContent className="p-6">
    <audio ref={audioRef} src={audioSrc} preload="metadata" crossOrigin="anonymous" />

    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary flex-shrink-0">
        <img
            src={speakerAvatar}
            alt={speakerName}
            className="w-full h-full object-cover"
            style={{ objectPosition: "center 1%" }}
            draggable={false}
         />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">{speakerName}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
            {isPlaying ? (
                <>
                <Play className="w-4 h-4" />
                <span>Reproduciendo audio...</span>
                </>
            ) : (
                <>
                <Pause className="w-4 h-4" />
                <span>En pausa</span>
                </>
            )}
        </p>
      </div>
    </div>

    {/* Visualizador de barras */}
    <div className="mb-6">
      <div
        className="w-full h-20 flex items-end justify-center gap-[3px] px-2"
        style={{ alignItems: "flex-end", overflow: "hidden" }}
      >
        {Array.from({ length: barsCount }).map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              barsRef.current[i] = el;
            }}
            style={{
              width: 3,
              height: "6%",
              borderRadius: 9999,
              background: "hsl(210, 90%, 35%)", // azul fuerte
              transition: "height 0.06s linear, box-shadow 0.06s linear",
            }}
          />
        ))}
      </div>
    </div>

    {/* Slider */}
    <div className="space-y-2 mb-4">
      <Slider
        value={[duration ? (currentTime / duration) * 100 : 0]}
        onValueChange={handleSeek}
        max={100}
        step={0.1}
        className="w-full"
      />
      <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>

    {/* Controls */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
            onClick={togglePlayPause}
            type="button"
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md hover:opacity-80 transition"
            >
            {isPlaying ? (
                <Pause className="h-6 w-6" />
            ) : (
                <Play className="h-6 w-6" />
            )}
        </button>
      </div>

      <div className="flex items-center gap-2 w-32">
        <Button variant="ghost" size="sm" onClick={toggleMute} className="h-8 w-8 p-0">
          {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume * 100]}
          onValueChange={handleVolumeChange}
          max={100}
          step={1}
          className="flex-1"
        />
      </div>
    </div>
  </CardContent>
</Card>

  )
}

export default AudioPlayer
