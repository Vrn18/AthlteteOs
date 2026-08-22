'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Trophy,
  Plus,
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Filter,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Radio,
  CreditCard,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { SimpleSelect } from '@/components/ui/select'
import { CURRENT_USER, INITIAL_MATCHES, INITIAL_SPORTS } from '@/lib/store'
import { Match, SkillLevel } from '@/types/database'
import { SOSRadarModal } from '@/components/dashboard/sos-radar-modal'
import { FeeSplitCard } from '@/components/dashboard/fee-split-card'
import { PostMatchReviewModal } from '@/components/dashboard/post-match-review-modal'

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES)
  const [selectedSport, setSelectedSport] = useState<string>('all')
  const [isHostModalOpen, setIsHostModalOpen] = useState(false)
  const [expandedFeeSplit, setExpandedFeeSplit] = useState<string | null>(null)
  
  // Modals for next-level MVP features
  const [sosModalMatch, setSosModalMatch] = useState<Match | null>(null)
  const [reviewModalMatch, setReviewModalMatch] = useState<Match | null>(null)

  // Host match form state
  const [newTitle, setNewTitle] = useState('')
  const [newSport, setNewSport] = useState('cricket')
  const [newLocation, setNewLocation] = useState('')
  const [newSkill, setNewSkill] = useState<SkillLevel>('Intermediate')
  const [newStartTime, setNewStartTime] = useState('')
  const [newMaxPlayers, setNewMaxPlayers] = useState(12)
  const [newTurfCost, setNewTurfCost] = useState(2400)
  const [newDescription, setNewDescription] = useState('')

  // Filtered matches
  const filteredMatches = matches.filter((m) =>
    selectedSport === 'all' ? true : m.sport_id.toLowerCase() === selectedSport.toLowerCase()
  )

  // Join or Leave Match Toggle
  const handleToggleJoin = (matchId: string) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === matchId) {
          const isAlreadyJoined = m.participants.some((p) => p.profile_id === CURRENT_USER.id)
          if (isAlreadyJoined) {
            return {
              ...m,
              current_players: Math.max(1, m.current_players - 1),
              participants: m.participants.filter((p) => p.profile_id !== CURRENT_USER.id),
            }
          } else {
            return {
              ...m,
              current_players: m.current_players + 1,
              participants: [
                ...m.participants,
                {
                  match_id: m.id,
                  profile_id: CURRENT_USER.id,
                  profile_name: CURRENT_USER.full_name,
                  profile_avatar: CURRENT_USER.avatar_url,
                  skill_level: 'Advanced',
                  status: 'confirmed',
                  payment_status: 'paid',
                  joined_at: new Date().toISOString(),
                },
              ],
            }
          }
        }
        return m
      })
    )
  }

  // Create new match handler
  const handleCreateMatch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newLocation.trim()) return

    const sportObj = INITIAL_SPORTS.find((s) => s.id === newSport) || INITIAL_SPORTS[0]
    const maxPlayers = Number(newMaxPlayers) || 10
    const turfCost = Number(newTurfCost) || 2000

    const createdMatch: Match = {
      id: `match_${Date.now()}`,
      creator_id: CURRENT_USER.id,
      creator_name: CURRENT_USER.full_name,
      creator_avatar: CURRENT_USER.avatar_url,
      sport_id: sportObj.id,
      sport_name: sportObj.name,
      sport_icon: sportObj.icon,
      title: newTitle.trim(),
      description: newDescription.trim() || 'Friendly sporting match arranged via AthleteOS.',
      location: newLocation.trim(),
      city: 'Bangalore',
      latitude: 12.9716,
      longitude: 77.5946,
      skill_level: newSkill,
      start_time: newStartTime.trim() || 'Tomorrow, 7:00 PM',
      max_players: maxPlayers,
      current_players: 1,
      status: 'open',
      total_turf_cost: turfCost,
      fee_per_player: Math.round(turfCost / maxPlayers),
      participants: [
        {
          match_id: `match_${Date.now()}`,
          profile_id: CURRENT_USER.id,
          profile_name: CURRENT_USER.full_name,
          profile_avatar: CURRENT_USER.avatar_url,
          skill_level: 'Advanced',
          status: 'confirmed',
          payment_status: 'paid',
          joined_at: new Date().toISOString(),
        },
      ],
    }

    setMatches([createdMatch, ...matches])
    setIsHostModalOpen(false)
    setNewTitle('')
    setNewLocation('')
    setNewDescription('')
  }

  return (
    <div className="space-y-8">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-brand-bright" />
            <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
              Matches & Events Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Browse turf games, friendly matches, split ground costs, and trigger emergency SOS subs.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/radar">
            <Button variant="destructive" className="font-bold gap-2 bg-red-600 hover:bg-red-700 shadow-md">
              <Radio className="h-4 w-4" />
              <span>SOS Radar Feed</span>
            </Button>
          </Link>

          <Button
            variant="bright"
            onClick={() => setIsHostModalOpen(true)}
            className="font-bold gap-2 shadow-md hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Host a Match</span>
          </Button>
        </div>
      </div>

      {/* Sport Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedSport('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            selectedSport === 'all'
              ? 'bg-brand-navy text-white shadow-sm'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Sports ({matches.length})
        </button>
        {INITIAL_SPORTS.slice(0, 5).map((sp) => (
          <button
            key={sp.id}
            onClick={() => setSelectedSport(sp.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              selectedSport === sp.id
                ? 'bg-brand-blue text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>{sp.name === 'Cricket' ? '🏏' : sp.name === 'Football' ? '⚽' : sp.name === 'Badminton' ? '🏸' : sp.name === 'Running' ? '🏃‍♂️' : '🏊‍♂️'}</span>
            <span>{sp.name}</span>
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMatches.map((match) => {
          const isJoined = match.participants.some((p) => p.profile_id === CURRENT_USER.id)
          const fillPercentage = Math.min(100, Math.round((match.current_players / match.max_players) * 100))
          const spotsLeft = match.max_players - match.current_players
          const isFeeSplitOpen = expandedFeeSplit === match.id

          return (
            <Card
              key={match.id}
              className="rounded-3xl border-2 border-slate-200 hover:border-brand-bright/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Top Match Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="brand" className="text-xs font-bold">
                      {match.sport_name}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      {match.skill_level}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    {spotsLeft > 0 && spotsLeft <= 3 && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setSosModalMatch(match)}
                        className="h-7 text-[10px] font-bold px-2.5 bg-red-600 hover:bg-red-700"
                      >
                        <Radio className="h-3 w-3 mr-1" /> SOS Sub
                      </Button>
                    )}

                    <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                      {match.current_players} / {match.max_players} Roster
                    </span>
                  </div>
                </div>

                {/* Match Title & Description */}
                <div>
                  <h3 className="text-lg font-bold text-brand-navy leading-snug">
                    {match.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed line-clamp-2">
                    {match.description}
                  </p>
                </div>

                {/* Logistics */}
                <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-brand-bright shrink-0" />
                    <span className="font-semibold text-slate-800">{match.start_time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{match.location}</span>
                  </div>
                </div>

                {/* Roster Progress Bar */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500">
                    <span>Squad Capacity</span>
                    <span className="text-brand-bright">{fillPercentage}% Filled</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        fillPercentage >= 90 ? 'bg-amber-500' : 'bg-brand-blue'
                      }`}
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Host Info & Quick Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={match.creator_avatar}
                      fallback={match.creator_name.substring(0, 2)}
                      className="h-7 w-7 border border-slate-200"
                    />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Host Organizer</span>
                      <span className="font-bold text-brand-navy text-xs">{match.creator_name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setExpandedFeeSplit(isFeeSplitOpen ? null : match.id)}
                      className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                    >
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>₹{match.fee_per_player || 200}/player</span>
                      {isFeeSplitOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>

                    <Link
                      href="/dashboard/messages"
                      className="text-xs font-bold text-brand-bright hover:underline flex items-center gap-1"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> Chat
                    </Link>
                  </div>
                </div>

                {/* Expandable Fee Splitter Ledger */}
                {isFeeSplitOpen && (
                  <div className="pt-2 animate-in slide-in-from-top-2">
                    <FeeSplitCard matchId={match.id} />
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setReviewModalMatch(match)}
                  className="text-xs font-semibold gap-1 text-slate-700"
                >
                  <Award className="h-3.5 w-3.5 text-amber-500" />
                  <span>Peer Review</span>
                </Button>

                <Button
                  size="sm"
                  variant={isJoined ? 'success' : 'bright'}
                  onClick={() => handleToggleJoin(match.id)}
                  className="text-xs font-semibold px-4"
                >
                  {isJoined ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Joined (Leave)
                    </span>
                  ) : (
                    'RSVP & Join Match'
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Host Match Dialog Modal */}
      {isHostModalOpen && (
        <Dialog open={isHostModalOpen} onOpenChange={setIsHostModalOpen}>
          <DialogHeader>
            <DialogTitle>Host a Match or Practice Session</DialogTitle>
            <DialogDescription>
              Create a match, configure turf fee splitting, and invite athletes in Bangalore.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateMatch} className="space-y-3.5 py-2">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Match Title *
              </label>
              <Input
                placeholder="e.g. 5v5 Turf League Friendly"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Sport
                </label>
                <SimpleSelect
                  value={newSport}
                  onChange={setNewSport}
                  options={[
                    { label: '🏏 Cricket', value: 'cricket' },
                    { label: '⚽ Football', value: 'football' },
                    { label: '🏸 Badminton', value: 'badminton' },
                    { label: '🏃‍♂️ Running', value: 'running' },
                  ]}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Target Skill
                </label>
                <SimpleSelect
                  value={newSkill}
                  onChange={(val) => setNewSkill(val as SkillLevel)}
                  options={[
                    { label: 'Beginner', value: 'Beginner' },
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                    { label: 'Open to All', value: 'Intermediate' },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Date & Time *
                </label>
                <Input
                  placeholder="e.g. Saturday, 6:00 PM"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  required
                  className="text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Max Squad Size
                </label>
                <Input
                  type="number"
                  min="2"
                  max="30"
                  value={newMaxPlayers}
                  onChange={(e) => setNewMaxPlayers(Number(e.target.value))}
                  required
                  className="text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Turf Cost (₹)
                </label>
                <Input
                  type="number"
                  min="0"
                  step="100"
                  value={newTurfCost}
                  onChange={(e) => setNewTurfCost(Number(e.target.value))}
                  required
                  className="text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Turf / Arena Location *
              </label>
              <Input
                placeholder="e.g. Play Arena, Sarjapur Road"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Notes & Equipment (Optional)
              </label>
              <textarea
                placeholder="e.g. Leather ball match, bring white cricket jersey"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={2}
                className="w-full text-xs p-2.5 rounded-lg border border-input bg-white focus:outline-none focus:ring-2 focus:ring-brand-bright"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsHostModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="bright" size="sm" className="font-bold">
                Publish Match
              </Button>
            </DialogFooter>
          </form>
        </Dialog>
      )}

      {/* SOS Radar Modal */}
      {sosModalMatch && (
        <SOSRadarModal
          isOpen={!!sosModalMatch}
          onClose={() => setSosModalMatch(null)}
          initialMatch={sosModalMatch}
        />
      )}

      {/* Post Match Peer Review Modal */}
      {reviewModalMatch && (
        <PostMatchReviewModal
          isOpen={!!reviewModalMatch}
          onClose={() => setReviewModalMatch(null)}
          match={reviewModalMatch}
        />
      )}

    </div>
  )
}
