import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import StagesSection from '../sections/StagesSection'
import LocationSection from '../sections/LocationSection'
// SPONSOR_SECTION_START: 暫時隱藏，需要時取消註解即可恢復
// import SponsorsSection from '../sections/SponsorsSection'
// SPONSOR_SECTION_END
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
      {/* <!-- SPONSOR_SECTION_START: 暫時隱藏，需要時取消註解即可恢復 --> */}
      {/* <SponsorsSection /> */}
      {/* <!-- SPONSOR_SECTION_END --> */}
      <ProcessSection />
      <MerchSection />
      <VoteSection />
      <GiftSection />
    </main>
  )
}
