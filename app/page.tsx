import { Navigation } from "@/components/navigation/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { SpatialInterface } from "@/components/sections/SpatialInterface";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { ImmersiveEnvironment } from "@/components/sections/ImmersiveEnvironment";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <Navigation />

      {/* 1 — Cinematic Hero */}
      <HeroSection />

      {/* 2 — Product Reveal */}
      <ProductReveal />

      {/* 3 — Features Deep Dive */}
      <FeaturesSection />

      {/* 4 — Spatial Glass Interface */}
      <SpatialInterface />

      {/* 5 — Performance Metrics */}
      <MetricsSection />

      {/* 6 — Immersive Network Environment */}
      <ImmersiveEnvironment />

      {/* 7 — Testimonials */}
      <TestimonialsSection />

      {/* 8 — Final CTA */}
      <CTASection />

      {/* 9 — Footer */}
      <Footer />
    </main>
  );
}
