import Hero from "../features/home/components/Hero";
import HomeNav from "../features/home/components/HomeNav";
import FeaturesGrid from "../features/home/components/FeaturesGrid";
import SocialProof from "../features/home/components/SocialProof";
import Branding from "../features/home/components/Branding";
import PricingSection from "../features/home/components/PricingSection";
import Footer from "../features/home/components/Footer";

const Home = () => {
  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      <HomeNav />
      <Hero />
      <FeaturesGrid />
      <PricingSection />
      <SocialProof />
      <Branding />
      <Footer />
    </div>
  );
};

export default Home;
