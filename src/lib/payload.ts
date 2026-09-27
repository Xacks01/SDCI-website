import { getPayload } from "payload";
import config from "@/payload.config";

export async function getSafePayload() {
  // On Vercel serverless functions, SQLite (payload.db) cannot open in read-write mode
  // on a read-only filesystem unless a PostgreSQL database URI is configured.
  // Bypassing SQLite on Vercel allows all subpages to render cleanly using verified static fallbacks.
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    const dbUri = process.env.DATABASE_URI || "";
    if (!dbUri.startsWith("postgres://") && !dbUri.startsWith("postgresql://")) {
      return null;
    }
  }

  try {
    return await getPayload({ config });
  } catch (error) {
    console.error("Failed to initialize Payload CMS:", error);
    return null;
  }
}
