'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Activity,
  SlidersHorizontal,
  ArrowRight,
  Send,
  CheckCircle2,
  Trophy,
  Zap,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { SimpleSelect } from '@/components/ui/select'
import { SEED_ATHLETES } from '@/lib/store'
import { computeAthleteMatchScore, ScoredAthlete } from '@/lib/matching-engine'
import { SkillLevel } from '@/types/database'

export function DiscoveryPreview() {
  const [selectedSport, setSelectedSport] = useState<string>('cricket')
  const [selectedSkill, setSelectedSkill] = useState<string>('All')
  const [maxDistance, setMaxDistance] = useState<number>(10)
  const [availability, setAvailability] = useState<'All' | 'Today' | 'Tomorrow' | 'This Weekend'>('Today')
  
  // Selected athlete for modal details
  const [activeModalAthlete, setActiveModalAthlete] = useState<ScoredAthlete | null>(null)
  const [invitedAthletes, setInvitedAthletes] = useState<Record<string, boolean>>({})

  // Dynamic deterministic matching computation
  const rankedAthletes = useMemo(() => {
    const scored = SEED_ATHLETES.map((athlete) =>
      computeAthleteMatchScore(athlete, {
        sportId: selectedSport,
        skillLevel: selectedSkill as any,
        maxDistanceKm: maxDistance,
        availability: availability,
      })
    )

    // Sort descending by total score
    return scored.sort((a, b) => b.scoreBreakdown.totalScore - a.scoreBreakdown.totalScore)
  }, [selectedSport, selectedSkill, maxDistance, availability])

  const handleInvite = (athleteId: string) => {
    setInvitedAthletes((prev) => ({ ...prev, [athleteId]: true }))
  }

  return (
    <section id="discover" className="py-20 bg-white border-b border-slate-200/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <Badge variant="brand" className="font-bold text-xs uppercase tracking-wider">
            Smart Matching Engine
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Find your people. Find your game.
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Powered by multi-criteria compatibility scoring (Sport 35% + Skill 25% + Distance 20% + Availability 10% + Activity 10%).
          </p>
        </div>

        {/* Dashboard-Style Discovery Sandbox Component */}
        <div className="max-w-5xl mx-auto rounded-3xl border-2 border-slate-200 bg-slate-50/50 p-4 sm:p-8 shadow-md">
          
          {/* Top Filter Controls Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-brand-bright" />
                <span className="text-sm font-bold text-brand-navy">Search & Filter Parameters</span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                Live Deterministic Scoring Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Sport Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Sport</label>
                <SimpleSelect
                  value={selectedSport}
                  onChange={(val) => setSelectedSport(val)}
                  options={[
                    { label: '🏏 Cricket', value: 'cricket' },
                    { label: '⚽ Football', value: 'football' },
                    { label: '🏸 Badminton', value: 'badminton' },
                    { label: '🏃‍♂️ Running', value: 'running' },
                  ]}
                />
              </div>

              {/* Skill Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Skill Level</label>
                <SimpleSelect
                  value={selectedSkill}
                  onChange={(val) => setSelectedSkill(val)}
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
                <label className="text-xs font-semibold text-slate-600 mb-1 flex justify-between">
                  <span>Max Radius</span>
                  <span className="text-brand-bright font-bold">{maxDistance} km</span>
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

              {/* Availability Filter */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">Availability</label>
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

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Ranked Compatibility Matches ({rankedAthletes.length})
            </span>
            <span className="text-xs text-brand-blue font-semibold">
              Location: Bangalore (Indiranagar / Koramangala)
            </span>
          </div>

          {/* Athlete Cards List */}
          <div className="space-y-3">
            {rankedAthletes.map((item) => {
              const { profile, primarySport, scoreBreakdown } = item
              const isInvited = invitedAthletes[profile.id]

              return (
                <div
                  key={profile.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-brand-bright/40 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  {/* Left: Avatar & Info */}
                  <div className="flex items-center gap-3.5">
                    <Avatar
                      src={profile.avatar_url}
                      fallback={profile.full_name.substring(0, 2)}
                      className="h-12 w-12 border-2 border-slate-100"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-brand-navy text-base">{profile.full_name}</h4>
                        {profile.verification_status === 'verified' && (
                          <ShieldCheck className="h-4 w-4 text-brand-bright" />
                        )}
                        <Badge variant="secondary" className="text-[10px] py-0 px-1.5 capitalize">
                          {profile.role}
                        </Badge>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="font-semibold text-brand-blue">
                          {primarySport?.sport_name || 'Multi-Sport'} • {primarySport?.skill_level}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="h-3 w-3 text-slate-400" /> {scoreBreakdown.distanceKm} km away ({profile.city})
                        </span>
                        <span>•</span>
                        <span className="text-green-600 font-medium">Available {availability}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Compatibility Score Badge & Action Buttons */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    
                    {/* Algorithm Score Metric */}
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 bg-blue-50 text-brand-blue font-extrabold text-sm px-2.5 py-1 rounded-xl border border-blue-200">
                        <Activity className="h-3.5 w-3.5 text-brand-bright" />
                        <span>{scoreBreakdown.totalScore}%</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                        ★ {profile.rating} ({profile.matches_played} games)
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setActiveModalAthlete(item)}
                        className="text-xs h-9 px-3 text-slate-700"
                      >
                        View Profile
                      </Button>

                      <Button
                        size="sm"
                        variant={isInvited ? "success" : "bright"}
                        onClick={() => handleInvite(profile.id)}
                        className="text-xs h-9 px-3 font-semibold"
                      >
                        {isInvited ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Invited
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Send className="h-3.5 w-3.5" /> Invite
                          </span>
                        )}
                      </Button>
                    </div>

                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Callout */}
          <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="text-xs text-slate-500">
              Want to experience full filters, multi-sport filters, and direct match invites?
            </span>
            <Link href="/dashboard/discover">
              <Button size="sm" variant="navy" className="text-xs font-semibold gap-1.5 shadow-sm">
                <span>Launch Full Smart Discovery</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

        </div>

      </div>

      {/* Athlete Detail Dialog Modal */}
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
                Bio & Playing Philosophy
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
                <div>• Reliability (20%): <span className="font-bold text-slate-800">{activeModalAthlete.scoreBreakdown.availabilityScore + activeModalAthlete.scoreBreakdown.activityScore}/20</span></div>
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

    </section>
  )
}
