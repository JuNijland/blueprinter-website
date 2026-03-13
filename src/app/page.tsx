import Header from "@/components/Header";
import Hero from "@/components/Hero";
import IsometricVisual from "@/components/IsometricVisual";
import FeatureSection from "@/components/FeatureSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const ecommerceFeatures = [
  {
    title: "Competitive landscape",
    description:
      "Gain deeper insights into your competitive landscape. Monitor pricing, positioning, and promotions across marketplaces in real time.",
    icon: "Crosshair",
  },
  {
    title: "Advertising & sales",
    description:
      "Observe how products and brands are advertised and sold. Track ad placements, sponsored listings, and sales performance.",
    icon: "Megaphone",
  },
  {
    title: "Sentiment analysis",
    description:
      "Address negative feedback and sentiments before they escalate. Aggregate reviews and ratings across channels automatically.",
    icon: "MessageCircleHeart",
  },
  {
    title: "Inventory monitoring",
    description:
      "Stay on top of inventory and avoid stockouts. Get alerts when stock levels drop or competitors run out of supply.",
    icon: "PackageSearch",
  },
];

const brandFeatures = [
  {
    title: "Product positioning",
    description:
      "Ensure products are being positioned correctly across retailers and marketplaces. Verify titles, images, and descriptions at scale.",
    icon: "LayoutGrid",
  },
  {
    title: "Brand protection",
    description:
      "Protect your brand against counterfeits and MAP violations. Detect unauthorized sellers and pricing infractions instantly.",
    icon: "ShieldCheck",
  },
  {
    title: "Customer behaviour",
    description:
      "Gain insight into customer behaviour. Understand how shoppers interact with your products through review analysis and search trends.",
    icon: "Users",
  },
  {
    title: "Dynamic pricing",
    description:
      "Optimize pricing strategies with real-time market data. Automatically track competitor price changes and adjust your positioning to maximize margins.",
    icon: "TrendingUpDown",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <div className="grid-lines" />

      <Header />

      <main className="relative z-10">
        <Hero />
        <IsometricVisual />
        <FeatureSection
          id="ecommerce"
          label="For E-commerce"
          heading="Data-driven e-commerce intelligence."
          features={ecommerceFeatures}
          variant="alternate"
        />
        <FeatureSection
          id="brands"
          label="For Brands"
          heading="Protect and grow your brand."
          features={brandFeatures}
        />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
