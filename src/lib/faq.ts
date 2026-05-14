export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What does Blueprinter do?",
    answer:
      "Blueprinter is an AI-first web data extraction platform for e-commerce intelligence. It automates how companies gather data from the web by integrating multiple online sources into unified, structured pipelines.",
  },
  {
    question: "Which e-commerce signals does Blueprinter monitor?",
    answer:
      "Blueprinter tracks the competitive landscape (pricing, positioning, promotions across marketplaces), advertising and sales performance (ad placements and sponsored listings), customer sentiment (reviews and ratings aggregated across channels), and inventory levels with stockout alerts.",
  },
  {
    question: "How does Blueprinter help brands?",
    answer:
      "Brands use Blueprinter to verify product positioning across retailers, protect against counterfeits and MAP violations, understand customer behaviour through review and search-trend analysis, and adjust pricing in real time based on competitor movements.",
  },
  {
    question: "Where does the data come from?",
    answer:
      "Blueprinter extracts data from marketplaces, retailer sites, and other public e-commerce sources, then normalises everything into structured pipelines you can query and act on.",
  },
  {
    question: "How do I get started?",
    answer:
      "Book a meeting through the button at the top of the website to discuss your use case and see a demo of the platform. We’ll work with you to understand your needs and show how Blueprinter can help.",
  },
];
