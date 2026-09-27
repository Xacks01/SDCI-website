export async function getSafePayload() {
  // On Vercel serverless environment without Postgres, bypass loading native SQLite bindings
  // to prevent EROFS/native binary cold-start crashes.
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    const dbUri = process.env.DATABASE_URI || "";
    if (!dbUri.startsWith("postgres://") && !dbUri.startsWith("postgresql://")) {
      return null;
    }
  }

  try {
    const config = (await import("@/payload.config")).default;
    const { getPayload } = await import("payload");
    return await getPayload({ config });
  } catch (error) {
    console.error("Failed to initialize Payload CMS:", error);
    return null;
  }
}
