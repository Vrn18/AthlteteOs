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
  sport_data: Record<string, any> // JSONB flexible stats (e.g. Batting Avg, Preferred Foot, 5k Pace)
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
  participants: MatchParticipant[]
}

export interface MatchParticipant {
  match_id: string
  profile_id: string
  profile_name: string
  profile_avatar: string
  skill_level: SkillLevel
  status: 'confirmed' | 'pending' | 'waitlist'
  joined_at: string
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
