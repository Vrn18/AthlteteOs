'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  Trophy,
  ExternalLink,
  Zap,
  Activity,
  Flame,
  Star,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { CURRENT_USER, CURRENT_USER_KARMA, CURRENT_USER_SPORTS } from '@/lib/store'

export function AthletePassportCard({
  athlete = CURRENT_USER,
  karma = CURRENT_USER_KARMA,
  sports = CURRENT_USER_SPORTS,
}: {
  athlete?: typeof CURRENT_USER
  karma?: typeof CURRENT_USER_KARMA
  sports?: typeof CURRENT_USER_SPORTS
}) {
  const [theme, setTheme] = useState<'gold' | 'obsidian' | 'neon'>('gold')
  const [copied, setCopied] = useState(false)

  const handleCopyLink = () => {
    const url = `${window.location.origin}/passport/${athlete.username}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Radar Polygon Points calculation (0 to 100 normalized)
  // 5 axes: Pace (85), Stamina (90), Skill (92), Rating (98), Reliability/Karma (98)
  const stats = {
    pace: 86,
    stamina: 91,
    skill: 94,
    rating: 98,
    karma: karma.overall_karma || 98,
  }

  const themeStyles = {
    gold: {
      cardBg: 'bg-gradient-to-b from-amber-200 via-amber-500 to-yellow-700',
      innerBg: 'bg-gradient-to-b from-slate-900 via-slate-900 to-brand-navy',
      accentText: 'text-amber-300',
      badgeBg: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      borderGlow: 'border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.3)]',
      polyFill: 'rgba(245, 158, 11, 0.45)',
      polyStroke: '#F59E0B',
    },
    obsidian: {
      cardBg: 'bg-gradient-to-b from-slate-700 via-indigo-900 to-slate-950',
      innerBg: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
      accentText: 'text-indigo-300',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
      borderGlow: 'border-indigo-500/60 shadow-[0_0_30px_rgba(99,102,241,0.3)]',
      polyFill: 'rgba(99, 102, 241, 0.45)',
      polyStroke: '#6366F1',
    },
    neon: {
      cardBg: 'bg-gradient-to-b from-sky-400 via-blue-600 to-purple-800',
      innerBg: 'bg-gradient-to-b from-slate-950 via-slate-900 to-blue-950',
      accentText: 'text-sky-300',
      badgeBg: 'bg-sky-400/20 text-sky-300 border-sky-400/40',
      borderGlow: 'border-sky-400/60 shadow-[0_0_30px_rgba(56,189,248,0.3)]',
      polyFill: 'rgba(56, 189, 248, 0.45)',
      polyStroke: '#38BDF8',
    },
  }

  const cur = themeStyles[theme]

  return (
    <div className="space-y-6">
      
      {/* Theme Picker & Share Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Passport Skin:</span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setTheme('gold')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                theme === 'gold' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Gold Pro
            </button>
            <button
              onClick={() => setTheme('obsidian')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                theme === 'obsidian' ? 'bg-indigo-900 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Obsidian Elite
            </button>
            <button
              onClick={() => setTheme('neon')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                theme === 'neon' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Neon Cyber
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className="text-xs font-semibold gap-1.5 flex-1 sm:flex-none"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                <span>Copied Link!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Share Link</span>
              </>
            )}
          </Button>

          <Link href={`/passport/${athlete.username}`} target="_blank">
            <Button size="sm" variant="bright" className="text-xs font-bold gap-1.5">
              <span>View Public Card</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 3D Holographic FUT-Style Card Container */}
      <div className="flex justify-center">
        <div
          className={`w-full max-w-sm p-3 rounded-[2.5rem] ${cur.cardBg} ${cur.borderGlow} transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1`}
        >
          <div
            className={`rounded-[2.2rem] ${cur.innerBg} text-white p-6 relative overflow-hidden border border-white/10 space-y-5`}
          >
            {/* Holographic Watermark Glow */}
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

            {/* Card Header: Overall Rating, Position, Tier */}
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <span className="text-4xl font-black font-mono tracking-tighter leading-none text-white">
                  94
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-slate-300 mt-1">
                  ALL-ROUNDER
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ELO: {athlete.elo_rating || 1540}
                </span>
              </div>

              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className={`text-[10px] font-bold ${cur.badgeBg}`}>
                  💎 {karma.badge_tier} Tier
                </Badge>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" /> {karma.overall_karma}% Karma
                </span>
              </div>
            </div>

            {/* Athlete Avatar & Name */}
            <div className="flex items-center gap-4 pt-1">
              <div className="relative">
                <Avatar
                  src={athlete.avatar_url}
                  fallback="VG"
                  className="h-16 w-16 border-2 border-amber-400/80 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 text-sm">🇮🇳</span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white leading-tight">
                  {athlete.full_name}
                </h3>
                <p className="text-xs text-slate-400">@{athlete.username}</p>
                <p className={`text-[11px] font-bold ${cur.accentText} mt-0.5`}>
                  Cricket • Football • Badminton
                </p>
              </div>
            </div>

            {/* Radar Polygon Visual */}
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>Multi-Sport Telemetry Radar</span>
                <span className={cur.accentText}>Overall 94</span>
              </div>

              {/* 5-Axis Radar Chart SVG */}
              <div className="h-36 w-full flex items-center justify-center relative">
                <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
                  {/* Background Grid Pentagons */}
                  <polygon
                    points="100,20 180,75 150,165 50,165 20,75"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1"
                  />
                  <polygon
                    points="100,50 150,85 130,140 70,140 50,85"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />

                  {/* Data Polygon */}
                  <polygon
                    points="100,28 172,78 142,158 58,158 28,78"
                    fill={cur.polyFill}
                    stroke={cur.polyStroke}
                    strokeWidth="2.5"
                  />

                  {/* Axis Labels */}
                  <text x="100" y="12" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
                    PAC 86
                  </text>
                  <text x="190" y="78" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="start">
                    STM 91
                  </text>
                  <text x="155" y="180" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
                    SKL 94
                  </text>
                  <text x="45" y="180" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
                    REL 98
                  </text>
                  <text x="10" y="78" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="end">
                    RAT 98
                  </text>
                </svg>
              </div>
            </div>

            {/* Quick 6 Stats Bar */}
            <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-white/10">
              <div className="p-1.5 bg-white/5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">BAT AVG</span>
                <span className="text-xs font-black text-white">38.4</span>
              </div>
              <div className="p-1.5 bg-white/5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">STRIKE RT</span>
                <span className="text-xs font-black text-amber-300">142.5</span>
              </div>
              <div className="p-1.5 bg-white/5 rounded-xl">
                <span className="text-[10px] text-slate-400 block font-semibold">WIN RATE</span>
                <span className="text-xs font-black text-emerald-400">76%</span>
              </div>
            </div>

            {/* Card Footer Brand Watermark */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
              <span className="font-bold tracking-wider">ATHLETEOS PASSPORT</span>
              <span className="font-mono">#IND-BLR-01</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
