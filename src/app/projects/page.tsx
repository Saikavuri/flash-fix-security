import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ProjectGallery } from "@/components/home/ProjectGallery";
import { QuoteSection } from "@/components/home/QuoteSection";
import { ClosingCta } from "@/components/home/ClosingCta";

export const metadata: Metadata = {
  title: "CCTV Installation Projects in Hyderabad",
  description:
    "A selection of completed CCTV installations across Hyderabad — residential, retail, commercial and industrial sites.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Installed work,"
        titleMuted="site by site."
        description="A selection of completed installations across Hyderabad. Tap any image to view it larger."
        image="/images/pages/projects.jpg"
      />

      <ProjectGallery />

      <QuoteSection />
      <ClosingCta />
    </>
  );
}
