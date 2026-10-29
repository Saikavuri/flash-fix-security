import { Hero } from "@/components/home/Hero";
import { ServicesCondensed } from "@/components/home/ServicesCondensed";
import { ProductsCondensed } from "@/components/home/ProductsCondensed";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TrustSection } from "@/components/home/TrustSection";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ClosingCta } from "@/components/home/ClosingCta";

/**
 * Homepage — six sections, deliberately concise.
 *
 * Solutions, Projects, FAQs and the full service / product catalogues live on
 * their own pages; every section below links out so nothing is hidden from
 * visitors, only moved to where it belongs.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesCondensed />
      <ProductsCondensed />
      <ProcessTimeline />
      <TrustSection />
      <QuoteSection />
      <ClosingCta />
    </>
  );
}
