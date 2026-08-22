export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Semi-Pro' | 'Professional'
export type VerificationStatus = 'verified' | 'pending' | 'unverified'
export type MatchStatus = 'open' | 'full' | 'in_progress' | 'completed' | 'cancelled'
export type UserRole = 'athlete' | 'coach' | 'team_manager'

export interface Profile {
  id: string
  username: string
  full_name: string
  avatar_url: string
  bio: string
  city: string
  latitude: number
  longitude: number
  verification_status: VerificationStatus
  role: UserRole
  rating: number
  matches_played: number
  win_rate: number
  elo_rating?: number
  karma_score?: number // Anti-Ghosting Reliability Score (0-100%)
  created_at: string
}

export interface Sport {
  id: string
  name: string
  icon: string
  category: 'Team' | 'Racquet' | 'Athletics' | 'Strategy' | 'Water' | 'Combat'
}

export interface AthleteSport {
  id: string
  profile_id: string
  sport_id: string
  sport_name: string
  sport_icon: string
  skill_level: SkillLevel
  experience_years: number
  sport_data: Record<string, any> // JSONB flexible stats
}

export interface Match {
  id: string
  creator_id: string
  creator_name: string
  creator_avatar: string
  sport_id: string
  sport_name: string
  sport_icon: string
  title: string
  description: string
  location: string
  city: string
  latitude: number
  longitude: number
  skill_level: SkillLevel
  start_time: string
  max_players: number
  current_players: number
  status: MatchStatus
  is_sos_active?: boolean
  sos_needed_count?: number
  sos_expires_in?: string
  total_turf_cost?: number
  fee_per_player?: number
  participants: MatchParticipant[]
}

export interface MatchParticipant {
  match_id: string
  profile_id: string
  profile_name: string
  profile_avatar: string
  skill_level: SkillLevel
  status: 'confirmed' | 'pending' | 'waitlist'
  payment_status?: 'paid' | 'pending' | 'deposit_locked'
  joined_at: string
}

export interface SOSBroadcast {
  id: string
  match_id: string
  sport_id: string
  sport_name: string
  sport_icon: string
  title: string
  location: string
  distance_km: number
  spots_needed: number
  kickoff_time: string
  expires_in_minutes: number
  host_name: string
  host_avatar: string
  host_rating: number
  bounty_perk?: string // e.g. "Free energy drink provided" or "Turf fee covered by host"
  urgency_level: 'critical' | 'high' | 'medium'
}

export interface PeerReview {
  id: string
  match_id: string
  match_title: string
  reviewer_id: string
  target_id: string
  target_name: string
  punctuality: 'on_time' | 'slight_delay' | 'no_show'
  sportsmanship: 'positive' | 'neutral' | 'toxic'
  skill_accuracy: 'accurate' | 'higher_than_stated' | 'lower_than_stated'
  feedback?: string
  created_at: string
}

export interface AthleteKarma {
  overall_karma: number // e.g. 98%
  punctuality_rate: number // 99%
  sportsmanship_rate: number // 96%
  skill_accuracy_rate: number // 95%
  total_reviews: number
  elo_rating: number
  badge_tier: 'Diamond' | 'Gold' | 'Silver' | 'Bronze'
}

export interface MatchFeeLedger {
  match_id: string
  total_turf_cost: number
  per_player_cost: number
  currency: string
  is_escrow_active: boolean
  players: Array<{
    profile_id: string
    name: string
    avatar: string
    amount: number
    status: 'paid' | 'pending' | 'deposit_locked'
    paid_at?: string
  }>
}

export interface Event {
  id: string
  creator_id: string
  sport_id: string
  sport_name: string
  title: string
  description: string
  location: string
  start_time: string
  end_time: string
  capacity: number
  registered_count: number
  fee: string
}

export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  sender_name: string
  sender_avatar: string
  message: string
  created_at: string
  is_match_channel?: boolean
}

export interface PerformanceRecord {
  id: string
  profile_id: string
  sport_id: string
  sport_name: string
  metric: string
  value: number | string
  unit: string
  recorded_at: string
}

export interface Achievement {
  id: string
  profile_id: string
  sport_id: string
  title: string
  description: string
  date: string
  badge_icon: string
}

export interface FilterState {
  sport: string
  skill: string
  location: string
  availability: string
  maxDistance: number
}
