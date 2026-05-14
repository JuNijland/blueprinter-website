import { siteUrl } from "@/lib/site";
import { faqItems } from "@/lib/faq";

const description =
  "Blueprinter is an AI-first web data extraction platform for e-commerce intelligence. Automate how you gather data from the web and integrate multiple online sources into unified, structured pipelines.";

const featureList = [
  "Competitive landscape monitoring",
  "Advertising and sales tracking",
  "Sentiment analysis across channels",
  "Inventory and stockout monitoring",
  "Product positioning verification",
  "Brand protection and MAP enforcement",
  "Customer behaviour insights",
  "Dynamic pricing intelligence",
];

export default function JsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Blueprinter",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logos/Blueprinter%20-%20Logo%20Design%20-%20final_Icoon%20Los%20-%20Black.svg`,
      },
      description,
      sameAs: [] as string[],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Blueprinter",
      description,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Blueprinter",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description,
      featureList,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
