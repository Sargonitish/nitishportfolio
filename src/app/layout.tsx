import type { Metadata, Viewport } from "next";
import "./studio.css";

const SITE = "http://nitishportfolio.xo.je";
const TITLE = "Nitish S — Engineering Student & Web Developer";
const DESC =
  "Results-driven Engineering student with hands-on experience in web development, software design, and AI-driven innovation. Building student portfolios, scalable applications, and practical tech solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | Nitish S" },
  description: DESC,
  applicationName: "Nitish S Portfolio",
  authors: [{ name: "Nitish S", url: SITE }],
  creator: "Nitish S",
  publisher: "Nitish S",
  keywords: [
    "Nitish S",
    "Nitish",
    "sargonitish",
    "engineering student Chennai",
    "freelance portfolio developer",
    "student portfolio developer",
    "web developer Chennai",
    "Python developer",
    "Java developer",
    "AI for education",
    "Tagore Engineering College",
    "portfolio",
    "Neo-Brutalism Portfolio",
    "Next.js Developer Chennai",
    "Full Stack Developer Portfolio",
    "Web Developer Portfolio",
  ],
  alternates: {
    canonical: SITE,
  },
  verification: {
    google: "whoQ5Eqc2jAPnYSNrw5KjBcWfWwdEjYb2sxjWbn9rgM",
  },
  category: "technology",
  openGraph: {
    type: "profile",
    url: SITE,
    siteName: "Nitish S Portfolio",
    title: TITLE,
    description: DESC,
    locale: "en_IN",
    images: [
      {
        url: `${SITE}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: "Nitish S — Engineering Student & Web Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    creator: "@sargonitish",
    images: [`${SITE}/twitter-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#FFEA00",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Structured data for Google Search Console (Rich Results, ProfilePage, Sitelinks, Person)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: SITE,
      name: "Nitish S Portfolio & Profile",
      description: DESC,
      dateCreated: "2024-01-01T00:00:00+05:30",
      dateModified: new Date().toISOString(),
      mainEntity: {
        "@type": "Person",
        "@id": `${SITE}/#person`,
        name: "Nitish S",
        alternateName: ["sargonitish", "Nitish"],
        identifier: "sargonitish",
        url: SITE,
        image: `${SITE}/media/nitish-photo.jpg`,
        email: "mailto:nitiships14@gmail.com",
        telephone: "+91-6369393673",
        jobTitle: "Engineering Student & Web Developer",
        description: DESC,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Chennai",
          addressRegion: "Tamil Nadu",
          postalCode: "600127",
          addressCountry: "IN",
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Tagore Engineering College",
            sameAs: "https://tagoreengg.edu.in",
          },
          {
            "@type": "EducationalOrganization",
            name: "Prince Matriculation Higher Secondary School",
          },
        ],
        knowsAbout: [
          "Web Development",
          "Next.js",
          "React",
          "TypeScript",
          "Python",
          "Java",
          "C++",
          "C",
          "JavaScript",
          "HTML5",
          "CSS3",
          "MySQL",
          "MongoDB",
          "Cloud Computing",
          "AI Solutions",
          "Neo-Brutalism Design",
        ],
        sameAs: [
          "https://github.com/Sargonitish",
          "https://www.linkedin.com/in/nitish-ping-perfect",
          "http://nitishportfolio.xo.je/",
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Nitish S Portfolio",
      alternateName: "Nitish S",
      description: DESC,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#service`,
      name: "Nitish S — Portfolio & Web Development Services",
      url: SITE,
      provider: { "@id": `${SITE}/#person` },
      areaServed: "Worldwide",
      description: DESC,
      serviceType: [
        "Portfolio Website Development",
        "Frontend Web Development",
        "AI in Education Solutions",
        "Software Engineering",
        "Full-Stack Web Apps",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Nitish",
          item: `${SITE}/#about`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Services",
          item: `${SITE}/#services`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Work & Projects",
          item: `${SITE}/#work`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Skills",
          item: `${SITE}/#skills`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Contact",
          item: `${SITE}/#contact`,
        },
      ],
    },
    {
      "@type": "SiteNavigationElement",
      "@id": `${SITE}/#navigation`,
      name: [
        "About",
        "Services",
        "Work",
        "Skills",
        "Story",
        "Contact",
      ],
      url: [
        `${SITE}/#about`,
        `${SITE}/#services`,
        `${SITE}/#work`,
        `${SITE}/#skills`,
        `${SITE}/#story`,
        `${SITE}/#contact`,
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${SITE}/#featured-projects`,
      name: "Featured Projects by Nitish S",
      description: "Selected software and web development projects by Nitish S.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "3D Neo-Brutalism Portfolio",
          description: "High-performance portfolio built with Next.js, Three.js, and GSAP.",
          url: `${SITE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "AI Solutions for Education",
          description: "Smart study assistants and automated test prep tools.",
          url: `${SITE}/#work`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Student Portfolio Platform",
          description: "Turnkey portfolio development for engineering graduates and tech job seekers.",
          url: `${SITE}/#services`,
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
