import React from 'react'
import { Trophy, Activity, Zap, Waves, Target, Circle, Crown } from 'lucide-react'

export function SportsStrip() {
  const sports = [
    { name: 'Cricket', icon: '🏏', highlight: 'Leather & Box Cricket' },
    { name: 'Football', icon: '⚽', highlight: '5v5, 7v7, 11-a-side' },
    { name: 'Badminton', icon: '🏸', highlight: 'Singles & Doubles' },
    { name: 'Running', icon: '🏃‍♂️', highlight: '5K, 10K, Half Marathon' },
    { name: 'Swimming', icon: '🏊‍♂️', highlight: 'Freestyle, Laps & Clubs' },
    { name: 'Tennis', icon: '🎾', highlight: 'Clay & Hard Court' },
    { name: 'Basketball', icon: '🏀', highlight: '3x3 & Full Court' },
    { name: 'Chess', icon: '♟️', highlight: 'Rapid & Classical' },
  ]

  return (
    <section className="w-full bg-brand-navy py-6 text-white border-y border-slate-800 shadow-inner overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 font-semibold shrink-0">
            <span className="h-2 w-2 rounded-full bg-brand-bright animate-pulse" />
            <span>Multi-Sport Network:</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-6 text-sm font-medium">
            {sports.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10 text-slate-200 hover:text-white"
              >
                <span className="text-base">{item.icon}</span>
                <span className="font-semibold text-xs sm:text-sm">{item.name}</span>
                {index < sports.length - 1 && (
                  <span className="hidden lg:inline-block text-slate-600 ml-2">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
