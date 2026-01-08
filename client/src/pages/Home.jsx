import Hero from "../features/home/components/Hero";
import Services from "../features/home/components/Services";
import ChooseUs from "../features/home/components/ChooseUs";
import Branding from "../features/home/components/Branding";
import PricingSection from "../features/home/components/PricingSection";
import Footer from "../features/home/components/Footer";
import HomeNav from "../features/home/components/HomeNav";

const Home = () => {
  return (
    <div>
      <HomeNav />
      <Hero />
      <Services />
      <ChooseUs />
      <PricingSection />
      <Branding />
      <Footer />
    </div>
  );
};

export default Home;
