'use client'

import React, { useState } from 'react'
import {
  ShieldCheck,
  Star,
  Clock,
  Heart,
  TrendingUp,
  CheckCircle2,
  ThumbsUp,
  AlertTriangle,
  Award,
} from 'lucide-react'
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { PeerReview, Match } from '@/types/database'
import { calculateEloAdjustment } from '@/lib/karma-engine'

export function PostMatchReviewModal({
  isOpen,
  onClose,
  match,
}: {
  isOpen: boolean
  onClose: () => void
  match?: Match
}) {
  const [selectedTeammate, setSelectedTeammate] = useState('usr_rahul_02')
  const [punctuality, setPunctuality] = useState<'on_time' | 'slight_delay' | 'no_show'>('on_time')
  const [sportsmanship, setSportsmanship] = useState<'positive' | 'neutral' | 'toxic'>('positive')
  const [skillAccuracy, setSkillAccuracy] = useState<'accurate' | 'higher_than_stated' | 'lower_than_stated'>('accurate')
  const [feedback, setFeedback] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [eloResult, setEloResult] = useState<{ newElo: number; delta: number } | null>(null)

  const teammates = [
    {
      id: 'usr_rahul_02',
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      role: 'Wicketkeeper Batsman',
    },
    {
      id: 'usr_arjun_03',
      name: 'Arjun Kumar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      role: 'Fast Bowler',
    },
  ]

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    const adjustment = calculateEloAdjustment(1540, 'win', 1510)
    setEloResult(adjustment)
    setIsSubmitted(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogHeader>
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-blue-50 text-brand-bright flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <DialogTitle className="text-lg font-black text-brand-navy">
              Post-Match Peer Review & Elo Rating
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Calibrate sportsmanship, punctuality, and skill accuracy to earn Karma badges.
            </DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div className="py-2">
        {isSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in zoom-in-95">
            <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-emerald-900">
                Peer Review Recorded!
              </h4>
              <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                Thank you for contributing to fair games. Teammate's Anti-Ghosting Karma and Elo have been calibrated.
              </p>
            </div>

            {eloResult && (
              <div className="bg-white p-4 rounded-xl border border-emerald-200 max-w-xs mx-auto shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Your Updated Athlete Rating
                </span>
                <div className="flex items-baseline justify-center gap-2 mt-1">
                  <span className="text-2xl font-black text-brand-navy">{eloResult.newElo} ELO</span>
                  <span className="text-xs font-bold text-emerald-600">▲ +{eloResult.delta} pts</span>
                </div>
              </div>
            )}

            <Button size="sm" variant="bright" onClick={onClose} className="font-bold">
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Select Teammate */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Select Teammate to Review:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {teammates.map((tm) => (
                  <button
                    type="button"
                    key={tm.id}
                    onClick={() => setSelectedTeammate(tm.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                      selectedTeammate === tm.id
                        ? 'border-brand-bright bg-blue-50/60 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <Avatar src={tm.avatar} fallback={tm.name.substring(0, 2)} className="h-8 w-8" />
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-brand-navy truncate">{tm.name}</h5>
                      <span className="text-[10px] text-slate-500 block truncate">{tm.role}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Metric 1: Punctuality */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand-bright" />
                <span>1. Punctuality & Attendance</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'on_time', label: 'On Time / Early', icon: '⏱️' },
                  { value: 'slight_delay', label: '5-10m Late', icon: '⏳' },
                  { value: 'no_show', label: 'No Show / Flake', icon: '🚫' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setPunctuality(opt.value as any)}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                      punctuality === opt.value
                        ? 'border-brand-blue bg-blue-50 text-brand-navy font-bold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-sm mb-0.5">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Metric 2: Sportsmanship */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 text-red-500" />
                <span>2. Sportsmanship & Team Spirit</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'positive', label: 'Great Energy ⭐', icon: '🙌' },
                  { value: 'neutral', label: 'Neutral', icon: '👍' },
                  { value: 'toxic', label: 'Unsportsmanlike', icon: '👎' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setSportsmanship(opt.value as any)}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                      sportsmanship === opt.value
                        ? 'border-brand-blue bg-blue-50 text-brand-navy font-bold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-sm mb-0.5">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Metric 3: Skill Accuracy */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                <span>3. Skill Tier Calibration</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'accurate', label: 'Accurate Tier', icon: '🎯' },
                  { value: 'higher_than_stated', label: 'Better than Rated', icon: '⚡' },
                  { value: 'lower_than_stated', label: 'Below Rated Tier', icon: '📉' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setSkillAccuracy(opt.value as any)}
                    className={`p-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                      skillAccuracy === opt.value
                        ? 'border-brand-blue bg-blue-50 text-brand-navy font-bold shadow-2xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="block text-sm mb-0.5">{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback note */}
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Compliment or Match Note (Optional)
              </label>
              <Input
                placeholder="e.g. Great death bowling spell & positive attitude!"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="text-xs"
              />
            </div>

            <Button type="submit" variant="bright" className="w-full font-bold text-xs h-10 shadow-sm mt-2">
              Submit Endorsement & Calibrate Elo
            </Button>
          </form>
        )}
      </div>

      {!isSubmitted && (
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      )}
    </Dialog>
  )
}
