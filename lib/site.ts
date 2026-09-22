// Site-wide settings used by metadata, header, footer, sitemap and robots.

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  contact: {
    email: string;
    phone: string;
  };
};

export const site: SiteConfig = {
  // PLACEHOLDER: brand name is TBD.
  name: "HR Agency",
  description:
    "Get a dedicated, remote HR professional, full-time or part-time, without the hiring hassle. One monthly invoice; we handle salary, benefits and paperwork.",
  // PLACEHOLDER: production domain is TBD (hosting not decided).
  url: "https://www.example.com",
  // PLACEHOLDER: contact details.
  contact: {
    email: "hello@example.com",
    phone: "+1 (555) 010-0199",
  },
};
