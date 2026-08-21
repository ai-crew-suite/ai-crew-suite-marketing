//import Clients from "@/components/HomePage/Clients";
import FAQ from "@/components/HomePage/FAQ";
import Features from "@/components/HomePage/Features";
import Hero from "@/components/HomePage/Hero";
import Solution from "@/components/HomePage/Solution";
import Pricing from "@/components/Pricing";
import Problems from "@/components/HomePage/Problems";
import { CTA } from "@/components/HomePage/CTA";
import { getHomePageContent } from "@/sanity/queries/homePage";
import { getPricingComponentContent } from "@/sanity/queries/pricingComponent";

export default async function Home() {
  const [homePageContent, pricingComponentContent] = await Promise.all([
    getHomePageContent(),
    getPricingComponentContent(),
  ]);

  return (
    <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-5 pt-24 md:gap-6">
      <Hero {...homePageContent.hero} />
      <Problems {...homePageContent.problems} />
      {/** <Clients {...homePageContent.clients} /> */}
      <Solution {...homePageContent.solution} />
      <Features {...homePageContent.features} />
      <Pricing content={pricingComponentContent} />
      <FAQ {...homePageContent.faq} />
      <CTA {...homePageContent.cta} />
    </main>
  );
}
