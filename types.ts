
export interface SectionCopy {
  id: string;
  name: string;
  purpose: string;
  content: {
    eyebrow?: string;
    headline: string;
    subheadline?: string;
    bullets?: string[];
    cta?: string;
    frictionRemover?: string;
    socialProof?: string;
    usp?: string;
    painPoint?: string;
    solutionTeaser?: string;
    reviews?: { author: string; text: string }[];
    steps?: { title: string; desc: string }[];
    team?: { name: string; role: string; desc: string }[];
    faqs?: { q: string; a: string }[];
    archetypes?: { title: string; quote: string }[];
    videoUrl?: string;
    mercadoPagoUrl?: string;
    paypalUrl?: string;
    imageUrl?: string;
    authorName?: string;
    authorTitle?: string;
    authorQuote?: string;
  };
}

export interface LandingPageData {
  businessName: string;
  offerName: string;
  sections: SectionCopy[];
}
