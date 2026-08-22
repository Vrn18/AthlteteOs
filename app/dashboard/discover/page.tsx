'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Compass,
  SlidersHorizontal,
  MapPin,
  Star,
  ShieldCheck,
  Activity,
  Send,
  CheckCircle2,
  Trophy,
  Users,
  Info,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { SimpleSelect } from '@/components/ui/select'
import { SEED_ATHLETES } from '@/lib/store'
import { computeAthleteMatchScore, ScoredAthlete } from '@/lib/matching-engine'
import { SkillLevel } from '@/types/database'

export default function DiscoverPage() {
  const [selectedSport, setSelectedSport] = useState<string>('cricket')
  const [selectedSkill, setSelectedSkill] = useState<string>('All')
  const [maxDistance, setMaxDistance] = useState<number>(10)
  const [availability, setAvailability] = useState<'All' | 'Today' | 'Tomorrow' | 'This Weekend'>('Today')
  
  const [activeModalAthlete, setActiveModalAthlete] = useState<ScoredAthlete | null>(null)
  const [invitedAthletes, setInvitedAthletes] = useState<Record<string, boolean>>({})

  // Deterministic scoring calculation
  const rankedAthletes = useMemo(() => {
    const scored = SEED_ATHLETES.map((athlete) =>
      computeAthleteMatchScore(athlete, {
        sportId: selectedSport,
        skillLevel: selectedSkill as any,
        maxDistanceKm: maxDistance,
        availability: availability,
      })
    )
    return scored.sort((a, b) => b.scoreBreakdown.totalScore - a.scoreBreakdown.totalScore)
  }, [selectedSport, selectedSkill, maxDistance, availability])

  const handleInvite = (athleteId: string) => {
    setInvitedAthletes((prev) => ({ ...prev, [athleteId]: true }))
  }

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-brand-bright" />
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Smart Discovery Engine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Deterministic sports compatibility matching across Bangalore.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-2xl border border-blue-200 text-xs font-semibold text-brand-blue">
          <Sparkles className="h-4 w-4 text-brand-bright" />
          <span>Formula: 35% Sport + 25% Skill + 20% Dist + 20% Trust</span>
        </div>
      </div>

      {/* Filter Sandbox Card */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-brand-bright" />
            <h3 className="text-sm font-bold text-brand-navy">Discovery Filter Matrix</h3>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setSelectedSport('cricket')
              setSelectedSkill('All')
              setMaxDistance(10)
              setAvailability('Today')
            }}
            className="text-xs text-slate-500 hover:text-brand-navy"
          >
            Reset Filters
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Sport Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Sport</label>
            <SimpleSelect
              value={selectedSport}
              onChange={setSelectedSport}
              options={[
                { label: '🏏 Cricket', value: 'cricket' },
                { label: '⚽ Football', value: 'football' },
                { label: '🏸 Badminton', value: 'badminton' },
                { label: '🏃‍♂️ Running', value: 'running' },
              ]}
            />
          </div>

          {/* Skill Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Skill Compatibility</label>
            <SimpleSelect
              value={selectedSkill}
              onChange={setSelectedSkill}
              options={[
                { label: 'All Skill Levels', value: 'All' },
                { label: 'Beginner', value: 'Beginner' },
                { label: 'Intermediate', value: 'Intermediate' },
                { label: 'Advanced', value: 'Advanced' },
                { label: 'Professional', value: 'Professional' },
              ]}
            />
          </div>

          {/* Distance Slider */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 flex justify-between">
              <span>Proximity Radius</span>
              <span className="text-brand-bright font-black">{maxDistance} km</span>
            </label>
            <input
              type="range"
              min="2"
              max="25"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-blue mt-2"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="text-xs font-bold text-slate-700 mb-1.5 block">Playing Availability</label>
            <SimpleSelect
              value={availability}
              onChange={(val) => setAvailability(val as any)}
              options={[
                { label: 'Today (Flexible)', value: 'Today' },
                { label: 'Tomorrow', value: 'Tomorrow' },
                { label: 'This Weekend', value: 'This Weekend' },
                { label: 'All Days', value: 'All' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Matching Algorithm Explanation Note */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
        <Info className="h-5 w-5 text-brand-bright shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-brand-navy">How Match Scores are Calculated:</span> Each candidate is scored out of 100 based on exact sport affinity (35 pts), skill tier proximity (25 pts), geographic distance from Indiranagar (20 pts), and verified reliability history (20 pts).
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {rankedAthletes.map((item) => {
          const { profile, primarySport, scoreBreakdown } = item
          const isInvited = invitedAthletes[profile.id]

          return (
            <div
              key={profile.id}
              className="bg-white p-5 rounded-3xl border-2 border-slate-200 hover:border-brand-bright/50 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={profile.avatar_url}
                      fallback={profile.full_name.substring(0, 2)}
                      className="h-14 w-14 border-2 border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-brand-navy text-base">{profile.full_name}</h3>
                        {profile.verification_status === 'verified' && (
                          <ShieldCheck className="h-4 w-4 text-brand-bright" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        {scoreBreakdown.distanceKm} km • {profile.city}
                      </p>
                    </div>
                  </div>

                  {/* Compatibility Score Circle */}
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue font-black text-sm px-2.5 py-1 rounded-xl border border-blue-200">
                      <Activity className="h-3.5 w-3.5 text-brand-bright" />
                      <span>{scoreBreakdown.totalScore}% Match</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                      ★ {profile.rating} ({profile.matches_played} matches)
                    </span>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                  {profile.bio}
                </p>

                {/* Score breakdown mini-bars */}
                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                    <span>Sport: {scoreBreakdown.sportScore}/35</span>
                    <span>Skill: {scoreBreakdown.skillScore}/25</span>
                    <span>Dist: {scoreBreakdown.distanceScore}/20</span>
                    <span>Trust: {scoreBreakdown.availabilityScore + scoreBreakdown.activityScore}/20</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                    <div className="bg-blue-600 h-full" style={{ width: `${(scoreBreakdown.sportScore / 35) * 35}%` }} />
                    <div className="bg-sky-500 h-full" style={{ width: `${(scoreBreakdown.skillScore / 25) * 25}%` }} />
                    <div className="bg-emerald-500 h-full" style={{ width: `${(scoreBreakdown.distanceScore / 20) * 20}%` }} />
                    <div className="bg-amber-400 h-full" style={{ width: `${((scoreBreakdown.availabilityScore + scoreBreakdown.activityScore) / 20) * 20}%` }} />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveModalAthlete(item)}
                  className="text-xs font-semibold"
                >
                  View Details
                </Button>

                <Button
                  size="sm"
                  variant={isInvited ? 'success' : 'bright'}
                  onClick={() => handleInvite(profile.id)}
                  className="text-xs font-semibold gap-1.5"
                >
                  {isInvited ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Invited ✓
                    </>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" /> Challenge / Invite
                    </>
                  )}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detailed Modal */}
      {activeModalAthlete && (
        <Dialog open={!!activeModalAthlete} onOpenChange={() => setActiveModalAthlete(null)}>
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Avatar
                src={activeModalAthlete.profile.avatar_url}
                fallback={activeModalAthlete.profile.full_name.substring(0, 2)}
                className="h-14 w-14 border-2 border-brand-bright"
              />
              <div className="text-left">
                <DialogTitle className="flex items-center gap-2">
                  <span>{activeModalAthlete.profile.full_name}</span>
                  <ShieldCheck className="h-4 w-4 text-brand-bright" />
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  @{activeModalAthlete.profile.username} • {activeModalAthlete.profile.city}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Bio & Playstyle
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {activeModalAthlete.profile.bio}
              </p>
            </div>

            {/* Score Algorithm Breakdown */}
            <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-brand-navy">
                <span>Deterministic Compatibility Breakdown</span>
                <span className="text-brand-bright font-black">{activeModalAthlete.scoreBreakdown.totalScore}%</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                <div>• Sport Match (35%): <span className="font-bold text-slate-800">{activeModalAthlete.scoreBreakdown.sportScore}/35</span></div>
                <div>• Skill Match (25%): <span className="font-bold text-slate-800">{activeModalAthlete.scoreBreakdown.skillScore}/25</span></div>
                <div>• Proximity (20%): <span className="font-bold text-slate-800">{activeModalAthlete.scoreBreakdown.distanceScore}/20</span></div>
                <div>• Trust & Activity (20%): <span className="font-bold text-slate-800">{activeModalAthlete.scoreBreakdown.availabilityScore + activeModalAthlete.scoreBreakdown.activityScore}/20</span></div>
              </div>
            </div>

            {/* Multi-Sport JSONB Stats */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                Sport Specific Statistics (JSONB Record)
              </span>
              <div className="bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-[11px] overflow-x-auto">
                <pre>{JSON.stringify(activeModalAthlete.primarySport.sport_data, null, 2)}</pre>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveModalAthlete(null)}
            >
              Close
            </Button>
            <Button
              variant="bright"
              size="sm"
              onClick={() => {
                handleInvite(activeModalAthlete.profile.id)
                setActiveModalAthlete(null)
              }}
            >
              Send Match Challenge
            </Button>
          </DialogFooter>
        </Dialog>
      )}

    </div>
  )
}
