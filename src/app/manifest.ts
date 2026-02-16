import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RapidAuto Mobile Mechanic",
    short_name: "RapidAuto",
    description:
      "On-site mobile mechanic service for diagnostics, maintenance, and repair.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f1a",
    theme_color: "#0b0f1a",
    orientation: "portrait",
    lang: "en-US",
    categories: ["automotive", "business", "utilities"],
    icons: [
      {
        src: "/next.svg",
        sizes: "180x180",
        type: "image/svg+xml",
      },
      {
        src: "/next.svg",
        sizes: "512x512",
        type: "image/svg+xml",
      },
    ],
  };
}
