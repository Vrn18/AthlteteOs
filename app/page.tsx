import { Navbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { SportsStrip } from '@/components/landing/sports-strip'
import { ProblemSection } from '@/components/landing/problem-section'
import { ServicesSection } from '@/components/landing/services-section'
import { HowItWorks } from '@/components/landing/how-it-works'
import { DiscoveryPreview } from '@/components/landing/discovery-preview'
import { AthleteCoachTeam } from '@/components/landing/athlete-coach-team'
import { Pricing } from '@/components/landing/pricing'
import { ImpactSection } from '@/components/landing/impact'
import { FinalCTA } from '@/components/landing/final-cta'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <Hero />
      <SportsStrip />
      <ProblemSection />
      <ServicesSection />
      <HowItWorks />
      <DiscoveryPreview />
      <AthleteCoachTeam />
      <Pricing />
      <ImpactSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
