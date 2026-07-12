import { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.sdcinitiative.com";

  // Static routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/media",
    "/programmes",
    "/get-involved",
    "/careers",
    "/data-tools",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const payload = await getPayload({ config });

    // Fetch publications
    const publications = await payload.find({
      collection: "publications",
      limit: 100,
    });

    const pubRoutes = publications.docs.map((pub: any) => ({
      url: `${baseUrl}/research/${pub.slug}`,
      lastModified: new Date(pub.updatedAt || pub.publishDate || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // Fetch podcast episodes
    const podcasts = await payload.find({
      collection: "podcast-episodes",
      limit: 100,
    });

    const podcastRoutes = podcasts.docs.map((pod: any) => ({
      url: `${baseUrl}/media/podcast/${pod.id}`,
      lastModified: new Date(pod.updatedAt || pod.publishDate || new Date()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [...routes, ...pubRoutes, ...podcastRoutes];
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
    return routes;
  }
}
