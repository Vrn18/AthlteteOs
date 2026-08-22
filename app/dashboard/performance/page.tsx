'use client'

import React, { useState } from 'react'
import {
  LineChart,
  Trophy,
  TrendingUp,
  Activity,
  Award,
  Zap,
  Star,
  Target,
  Flame,
  Calendar,
  ShieldCheck,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CURRENT_USER, CURRENT_USER_SPORTS, USER_ACHIEVEMENTS, USER_PERFORMANCE } from '@/lib/store'

export default function PerformancePage() {
  const [selectedSport, setSelectedSport] = useState('cricket')

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <LineChart className="h-6 w-6 text-brand-bright" />
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            Performance & Growth Center
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Historical match telemetry, win percentages, stamina benchmarks, and verified skill badges.
        </p>
      </div>

      {/* Top 4 Performance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Overall Win Rate</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-navy">{CURRENT_USER.win_rate}%</span>
            <span className="text-xs text-emerald-600 font-bold">▲ +4%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-emerald-500 h-full" style={{ width: `${CURRENT_USER.win_rate}%` }} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Matches Logged</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-navy">{CURRENT_USER.matches_played}</span>
            <span className="text-xs text-brand-bright font-bold">34 Games</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Across 4 different sports</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Reliability Score</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-bright">100%</span>
            <span className="text-xs text-green-600 font-bold">No Flakes</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">34/34 on-time match check-ins</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs text-slate-500 font-medium">Athlete Level</span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-navy">Tier 4</span>
            <span className="text-xs text-amber-500 font-bold">★ Pro</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-2">Top 8th percentile Bangalore</p>
        </div>
      </div>

      {/* Sport Telemetry Deep Dive */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-brand-navy">Sport-Specific Telemetry Metrics</h2>
            <p className="text-xs text-slate-500">Benchmark your stats against local league averages.</p>
          </div>

          {/* Sport Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            {['cricket', 'football', 'badminton', 'running'].map((sp) => (
              <button
                key={sp}
                onClick={() => setSelectedSport(sp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  selectedSport === sp
                    ? 'bg-white text-brand-navy shadow-xs'
                    : 'text-slate-600 hover:text-brand-navy'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Sport Visual Stats */}
        {selectedSport === 'cricket' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Batting Average</span>
              <div className="text-3xl font-black text-brand-navy">38.40</div>
              <p className="text-xs text-green-600 font-semibold">★ Elite Top-Order Tier</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-brand-blue h-full w-[78%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Strike Rate</span>
              <div className="text-3xl font-black text-brand-bright">142.50</div>
              <p className="text-xs text-slate-600">Calculated over 18 T20 innings</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-sky-500 h-full w-[85%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Wickets / Economy</span>
              <div className="text-3xl font-black text-brand-navy">47 Wkts</div>
              <p className="text-xs text-slate-600">Economy 6.82 rpo • Best 4/18</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full w-[72%]" />
              </div>
            </div>
          </div>
        )}

        {selectedSport === 'football' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Goals & Assists</span>
              <div className="text-3xl font-black text-brand-navy">19 G / 28 A</div>
              <p className="text-xs text-green-600 font-semibold">1.12 Goal Contribution / Game</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-brand-blue h-full w-[88%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Pass Accuracy</span>
              <div className="text-3xl font-black text-brand-bright">84.2%</div>
              <p className="text-xs text-slate-600">Center Midfield Distribution</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-sky-500 h-full w-[84%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Distance Covered</span>
              <div className="text-3xl font-black text-brand-navy">7.8 km</div>
              <p className="text-xs text-slate-600">Average per 60m turf match</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full w-[75%]" />
              </div>
            </div>
          </div>
        )}

        {selectedSport === 'badminton' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Smash Velocity</span>
              <div className="text-3xl font-black text-brand-navy">245 km/h</div>
              <p className="text-xs text-green-600 font-semibold">Yonex Astrox 88D Pro</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-brand-blue h-full w-[74%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Local Ranking</span>
              <div className="text-3xl font-black text-brand-bright">#12 Club</div>
              <p className="text-xs text-slate-600">Indiranagar Smash Arena</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-sky-500 h-full w-[88%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Doubles Win Rate</span>
              <div className="text-3xl font-black text-brand-navy">82%</div>
              <p className="text-xs text-slate-600">18 Wins / 22 Matches</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full w-[82%]" />
              </div>
            </div>
          </div>
        )}

        {selectedSport === 'running' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">5K Personal Best</span>
              <div className="text-3xl font-black text-brand-navy">21:40 min</div>
              <p className="text-xs text-green-600 font-semibold">Pace: 4:20 min/km</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-brand-blue h-full w-[80%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">10K Personal Best</span>
              <div className="text-3xl font-black text-brand-bright">46:15 min</div>
              <p className="text-xs text-slate-600">Cubbon Park Sunrise Run</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-sky-500 h-full w-[76%]" />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Weekly Mileage</span>
              <div className="text-3xl font-black text-brand-navy">28.0 km</div>
              <p className="text-xs text-slate-600">Target: 30 km / week</p>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full w-[93%]" />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Verified Achievement Badges Showcase */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h3 className="text-xl font-bold text-brand-navy">Unlocked Athletic Badges</h3>
          </div>
          <Badge variant="popular" className="text-xs">3/12 Earned</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {USER_ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/30 border border-amber-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">🏅</span>
                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                  {ach.date}
                </span>
              </div>
              <h4 className="font-bold text-sm text-brand-navy">{ach.title}</h4>
              <p className="text-xs text-slate-600">{ach.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
