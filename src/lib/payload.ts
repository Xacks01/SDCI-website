import { getPayload } from "payload";
import config from "@/payload.config";

export async function getSafePayload() {
  try {
    return await getPayload({ config });
  } catch (error) {
    console.error("Failed to initialize Payload CMS:", error);
    return null;
  }
}
