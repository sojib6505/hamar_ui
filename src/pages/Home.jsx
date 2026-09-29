import Hero from '@/components/home/Hero'
import TrustIndicators from '@/components/home/TrustIndicators'
import FeaturedCategories from '@/components/home/FeaturedCategories'
import FeaturedBrands from '@/components/home/FeaturedBrands'
import BestSellers from '@/components/home/BestSellers'
import WhyHamar from '@/components/home/WhyHamar'
import OriginalVsFake from '@/components/home/OriginalVsFake'
import TechLearningCenter from '@/components/home/TechLearningCenter'
import HamarCommunitySection from '@/components/home/HamarCommunitySection'
import CustomerReviews from '@/components/home/CustomerReviews'
import InstagramGallery from '@/components/home/InstagramGallery'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <BestSellers />
      <FeaturedCategories />
      <FeaturedBrands />
      <WhyHamar />
      <OriginalVsFake />
      <TechLearningCenter />
      <HamarCommunitySection />
      <CustomerReviews />
      <InstagramGallery />
      <Newsletter />
    </>
  )
}
