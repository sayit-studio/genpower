import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import StagesSection from '../sections/StagesSection'
import LocationSection from '../sections/LocationSection'
// SPONSOR_SECTION_START: 贊助商區塊，暫時隱藏但保留程式碼
// import SponsorsSection from '../sections/SponsorsSection'
// SPONSOR_SECTION_END
import ProcessSection from '../sections/ProcessSection'
import MerchSection from '../sections/MerchSection'
import GiftSection from '../components/sections/GiftSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <StagesSection />
      <LocationSection />
      {/* <!-- SPONSOR_SECTION_START: 贊助商區塊，暫時隱藏但保留程式碼 --> */}
      {/* <SponsorsSection /> */}
      {/* <!-- SPONSOR_SECTION_END --> */}
      <ProcessSection />
      <MerchSection />
      <GiftSection />
    </main>
  )
}
