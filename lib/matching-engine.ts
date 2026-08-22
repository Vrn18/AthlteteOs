import { Profile, AthleteSport, SkillLevel } from "@/types/database"

export interface SearchCriteria {
  sportId: string
  skillLevel: SkillLevel | 'All'
  userLat?: number
  userLng?: number
  maxDistanceKm: number
  availability: 'All' | 'Today' | 'Tomorrow' | 'This Weekend'
}

export interface MatchScoreBreakdown {
  sportScore: number // max 35
  skillScore: number // max 25
  distanceScore: number // max 20
  availabilityScore: number // max 10
  activityScore: number // max 10
  totalScore: number // max 100
  distanceKm: number
}

export interface ScoredAthlete {
  profile: Profile
  athleteSports: AthleteSport[]
  primarySport: AthleteSport
  scoreBreakdown: MatchScoreBreakdown
}

// Distance calculator using Haversine formula
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // Earth radius in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Number((R * c).toFixed(1))
}

const skillRank: Record<SkillLevel, number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  'Semi-Pro': 4,
  Professional: 5,
}

export function computeAthleteMatchScore(
  athlete: { profile: Profile; athleteSports: AthleteSport[] },
  criteria: SearchCriteria
): ScoredAthlete {
  const { profile, athleteSports } = athlete

  // Default Bangalore coordinate if not provided
  const userLat = criteria.userLat || 12.9716
  const userLng = criteria.userLng || 77.5946

  const distanceKm = calculateDistanceKm(
    userLat,
    userLng,
    profile.latitude || userLat,
    profile.longitude || userLng
  )

  // 1. Sport Match (35%)
  const matchedSport = athleteSports.find(
    (as) => as.sport_id.toLowerCase() === criteria.sportId.toLowerCase()
  )
  const sportScore = matchedSport ? 35 : 10 // fallback partial score if multi-sport athlete

  // Primary active sport for this query
  const primarySport = matchedSport || athleteSports[0]

  // 2. Skill Compatibility (25%)
  let skillScore = 20
  if (criteria.skillLevel === 'All') {
    skillScore = 25
  } else if (matchedSport) {
    const userRank = skillRank[criteria.skillLevel as SkillLevel] || 2
    const athleteRank = skillRank[matchedSport.skill_level] || 2
    const diff = Math.abs(userRank - athleteRank)
    if (diff === 0) skillScore = 25
    else if (diff === 1) skillScore = 18
    else if (diff === 2) skillScore = 12
    else skillScore = 6
  }

  // 3. Distance Score (20%)
  // Proportional up to maxDistanceKm
  let distanceScore = 20
  if (distanceKm <= 2) {
    distanceScore = 20
  } else if (distanceKm <= criteria.maxDistanceKm) {
    const factor = (criteria.maxDistanceKm - distanceKm) / criteria.maxDistanceKm
    distanceScore = Math.max(8, Math.round(factor * 20))
  } else {
    distanceScore = Math.max(2, Math.round(20 - (distanceKm - criteria.maxDistanceKm)))
  }

  // 4. Availability Score (10%)
  let availabilityScore = 10
  if (criteria.availability === 'Today') {
    availabilityScore = profile.rating >= 4.7 ? 10 : 8
  } else if (criteria.availability === 'Tomorrow') {
    availabilityScore = 9
  } else {
    availabilityScore = 10
  }

  // 5. Activity / Reliability Score (10%)
  // Based on verified status, matches played, and rating
  let activityScore = 5
  if (profile.verification_status === 'verified') activityScore += 3
  if (profile.matches_played > 10) activityScore += 2

  const totalScore = Math.min(
    100,
    sportScore + skillScore + distanceScore + availabilityScore + activityScore
  )

  return {
    profile,
    athleteSports,
    primarySport,
    scoreBreakdown: {
      sportScore,
      skillScore,
      distanceScore,
      availabilityScore,
      activityScore,
      totalScore,
      distanceKm,
    },
  }
}
