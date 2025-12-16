// Business types data
export const businessTypes = [
  {
    id: "sole_proprietorship",
    name: "Sole proprietorship",
    description: "You own an unincorporated business by yourself.",
  },
  {
    id: "corporation",
    name: "Corporation",
    description:
      "The legal entity of your business is independent from its owners.",
  },
  {
    id: "partnership",
    name: "Partnership",
    description: "You and one or more people run a business together.",
  },
  {
    id: "individual",
    name: "Individual",
    description:
      "You're selling under your own name, not as a registered business.",
  },
];

// FAQ data
export const faqItems = [
  {
    question: "Why do I need to provide my 'Business Type'?",
    answer:
      "Your business type helps us understand your legal structure and ensures we provide the appropriate seller experience and tax documentation for your situation.",
  },
  {
    question: "What if my country is not listed?",
    answer:
      "Currently, Temu seller services are only available in select countries. We're continuously expanding to new regions. Please check back later or contact support for updates.",
  },
  {
    question: "What is 'EIN'?",
    answer:
      "An EIN (Employer Identification Number) is a unique nine-digit number assigned by the IRS to businesses operating in the United States for tax purposes.",
  },
];

export const steps = [
  { number: 1, label: "Business information" },
  { number: 2, label: "Seller information" },
  { number: 3, label: "Shop" },
];
