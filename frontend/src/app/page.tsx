import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { ProcessTeaserSection } from "@/components/home/process-teaser";
import { ProofSection } from "@/components/home/proof-section";
import { TeachersSection } from "@/components/home/teachers-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CoursesTeaserSection } from "@/components/home/courses-teaser";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[var(--background)]">
        <Hero />
        <ProcessTeaserSection />
        <CoursesTeaserSection />
        <TeachersSection />
        <ProofSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
