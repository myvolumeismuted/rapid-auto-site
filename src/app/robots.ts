import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rapidautoworks.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/tos"],
        disallow: ["/admin", "/admin/", "/api/", "/quote-approval/", "/payment"],
      },
      {
        userAgent: "Googlebot",
        allow: ["/", "/about", "/tos"],
        disallow: ["/admin", "/admin/", "/api/", "/quote-approval/", "/payment"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
