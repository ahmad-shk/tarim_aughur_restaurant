"use client"

import { useState } from "react"
import ReactPlayer from "react-player"
import { Play, Pause } from "lucide-react"

export function AmbienceVideo() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative w-full md:aspect-[16/6] aspect-[16/9] overflow-hidden">
      <ReactPlayer
        src="https://youtu.be/xPPLbEFbCAo?si=Oanv8SoE87JsV2ZR" 
        playing={playing}
        width="100%"
        height="100%"
        controls={false}
      />

      <button
        onClick={() => setPlaying(!playing)}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 p-3 rounded-full hover:bg-black/50 transition"
      >
        {playing ? (
          <Pause className="w-12 h-12 text-white" />
        ) : (
          <Play className="w-12 h-12 text-white" />
        )}
      </button>
    </div>
  )
}
