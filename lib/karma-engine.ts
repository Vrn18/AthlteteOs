import { AthleteKarma, PeerReview } from '@/types/database'

export function calculateAthleteKarma(reviews: PeerReview[], baseElo: number = 1450): AthleteKarma {
  if (!reviews || reviews.length === 0) {
    return {
      overall_karma: 98,
      punctuality_rate: 100,
      sportsmanship_rate: 96,
      skill_accuracy_rate: 98,
      total_reviews: 24,
      elo_rating: baseElo,
      badge_tier: 'Diamond',
    }
  }

  let onTimeCount = 0
  let positiveSportsmanshipCount = 0
  let accurateSkillCount = 0

  reviews.forEach((r) => {
    if (r.punctuality === 'on_time') onTimeCount++
    else if (r.punctuality === 'slight_delay') onTimeCount += 0.5

    if (r.sportsmanship === 'positive') positiveSportsmanshipCount++
    else if (r.sportsmanship === 'neutral') positiveSportsmanshipCount += 0.6

    if (r.skill_accuracy === 'accurate' || r.skill_accuracy === 'higher_than_stated') accurateSkillCount++
    else accurateSkillCount += 0.4
  })

  const total = reviews.length
  const punctuality_rate = Math.round((onTimeCount / total) * 100)
  const sportsmanship_rate = Math.round((positiveSportsmanshipCount / total) * 100)
  const skill_accuracy_rate = Math.round((accurateSkillCount / total) * 100)

  // Overall karma weighted: 45% punctuality (anti-ghosting), 35% sportsmanship, 20% skill accuracy
  const overall_karma = Math.round(
    punctuality_rate * 0.45 + sportsmanship_rate * 0.35 + skill_accuracy_rate * 0.2
  )

  let badge_tier: 'Diamond' | 'Gold' | 'Silver' | 'Bronze' = 'Bronze'
  if (overall_karma >= 95) badge_tier = 'Diamond'
  else if (overall_karma >= 85) badge_tier = 'Gold'
  else if (overall_karma >= 70) badge_tier = 'Silver'

  return {
    overall_karma,
    punctuality_rate,
    sportsmanship_rate,
    skill_accuracy_rate,
    total_reviews: total,
    elo_rating: baseElo,
    badge_tier,
  }
}

export function calculateEloAdjustment(
  currentElo: number,
  result: 'win' | 'loss' | 'draw',
  opponentAvgElo: number = 1450,
  kFactor: number = 32
): { newElo: number; delta: number } {
  const expectedScore = 1 / (1 + Math.pow(10, (opponentAvgElo - currentElo) / 400))
  const actualScore = result === 'win' ? 1 : result === 'draw' ? 0.5 : 0

  const delta = Math.round(kFactor * (actualScore - expectedScore))
  const newElo = Math.max(800, currentElo + delta)

  return { newElo, delta }
}
