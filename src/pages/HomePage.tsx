import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import StagesSection from '../sections/StagesSection'
import LocationSection from '../sections/LocationSection'
import SponsorsSection from '../sections/SponsorsSection'
import ProcessSection from '../sections/ProcessSection'
import MerchSection from '../sections/MerchSection'
import VoteSection from '../components/sections/VoteSection'
import GiftSection from '../components/sections/GiftSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <StagesSection />
      <LocationSection />
      <SponsorsSection />
      <ProcessSection />
      <MerchSection />
      <VoteSection />
      <GiftSection />
    </main>
  )
}
