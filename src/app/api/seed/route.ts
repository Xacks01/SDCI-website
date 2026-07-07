import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import { seed } from "@/payload/seed";
import { pushDevSchema } from "@payloadcms/drizzle";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Simple security check using the PAYLOAD_SECRET
    if (!secret || secret !== process.env.PAYLOAD_SECRET) {
      return NextResponse.json({ error: "Unauthorized. Please provide the correct secret query parameter." }, { status: 401 });
    }

    const payload = await getPayload({ config });
    
    // Manually push schema in production for seeding to auto-create tables
    if (process.env.NODE_ENV === "production") {
      payload.logger.info("Production seeding: running manual schema push...");
      await pushDevSchema(payload.db as any);
    }

    // Seed the database
    await seed(payload);

    return NextResponse.json({ success: true, message: "Database successfully seeded in production!" });
  } catch (error: any) {
    console.error("Production seeding failed:", error);
    const cause = error.cause || {};
    return NextResponse.json({ 
      error: error.message || "Seeding failed",
      detail: cause.detail || error.detail || null,
      hint: cause.hint || error.hint || null,
      code: cause.code || error.code || null,
      stack: error.stack || null
    }, { status: 500 });
  }
}
