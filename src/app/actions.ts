"use server";

import { getPayload } from "payload";
import config from "@/payload.config";
import { z } from "zod";

// Schema validations
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  organisation: z.string().optional(),
  reason: z.string().min(1, "Reason is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  organisation: z.string().min(2, "Organisation is required"),
  engagementType: z.enum(["research", "training", "advisory", "evaluation", "other"]),
  deliverables: z.string().min(5, "Deliverables description is required"),
  timeline: z.string().min(1, "Timeline is required"),
  budget: z.string().optional(),
});

// Actions
export async function seedDbAction() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "membership-tiers",
      limit: 1,
    });
    if (result.totalDocs > 0) {
      return { success: true, message: "Database already seeded." };
    }

    const { seed } = await import("@/payload/seed");
    await seed(payload);
    return { success: true, message: "Database successfully seeded!" };
  } catch (error: any) {
    console.error("Seed error:", error);
    return { success: false, error: error.message || "Seeding failed" };
  }
}

export async function newsletterSignupAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const validated = newsletterSchema.parse({ email });

    const payload = await getPayload({ config });
    
    // Check if email already signed up
    const existing = await payload.find({
      collection: "submissions",
      where: {
        formType: { equals: "newsletter" },
        email: { equals: validated.email },
      },
    });

    if (existing.totalDocs > 0) {
      return { success: true, message: "You are already subscribed!" };
    }

    await payload.create({
      collection: "submissions",
      data: {
        formType: "newsletter",
        email: validated.email,
      },
    });

    // Mailchimp integration hook
    const apiKey = process.env.MAILCHIMP_API_KEY;
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

    if (apiKey && audienceId) {
      try {
        const dc = apiKey.includes("-") ? apiKey.split("-")[1] : "us1";
        const auth = Buffer.from(`anystring:${apiKey}`).toString("base64");
        
        const mcResponse = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${auth}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: validated.email,
            status: "subscribed",
          }),
        });

        if (!mcResponse.ok) {
          const errorData = await mcResponse.json();
          if (errorData.title === "Member Exists" || (errorData.status === 400 && errorData.detail?.toLowerCase().includes("already a list member"))) {
            console.log(`[Mailchimp Integration] ${validated.email} is already subscribed in Mailchimp.`);
          } else {
            console.error("[Mailchimp Integration Error]", errorData);
          }
        } else {
          console.log(`[Mailchimp Integration] Successfully subscribed ${validated.email} to Mailchimp.`);
        }
      } catch (err) {
        console.error("[Mailchimp Integration Failed]", err);
      }
    } else {
      console.log(`[Mailchimp Integration] Skipped. MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID not configured.`);
    }

    return { success: true, message: "Successfully subscribed to the newsletter!" };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof z.ZodError ? error.issues[0].message : (error.message || "Failed to subscribe"),
    };
  }
}

export async function contactMessageAction(data: {
  name: string;
  email: string;
  organisation?: string;
  reason: string;
  message: string;
}) {
  try {
    const validated = contactSchema.parse(data);

    const payload = await getPayload({ config });
    await payload.create({
      collection: "submissions",
      data: {
        formType: "contact",
        name: validated.name,
        email: validated.email,
        organisation: validated.organisation,
        message: `${validated.reason}: ${validated.message}`,
      },
    });

    return { success: true, message: "Your message has been sent successfully!" };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof z.ZodError ? error.issues[0].message : (error.message || "Failed to send message"),
    };
  }
}

export async function consultationRequestAction(data: {
  name: string;
  email: string;
  organisation: string;
  engagementType: "research" | "training" | "advisory" | "evaluation" | "other";
  deliverables: string;
  timeline: string;
  budget?: string;
}) {
  try {
    const validated = consultationSchema.parse(data);

    const payload = await getPayload({ config });
    await payload.create({
      collection: "submissions",
      data: {
        formType: "consultation",
        name: validated.name,
        email: validated.email,
        organisation: validated.organisation,
        engagementType: validated.engagementType,
        deliverables: validated.deliverables,
        timeline: validated.timeline,
        budget: validated.budget,
      },
    });

    return { success: true, message: "Your consultation request has been received!" };
  } catch (error: any) {
    return {
      success: false,
      error: error instanceof z.ZodError ? error.issues[0].message : (error.message || "Failed to request consultation"),
    };
  }
}

export async function cvSubmissionAction(data: {
  name: string;
  email: string;
  interest: string;
  cvFileId?: string; // Relationship id to uploaded media file
}) {
  try {
    if (!data.name || !data.email || !data.interest) {
      throw new Error("Name, email, and area of interest are required.");
    }

    const payload = await getPayload({ config });
    await payload.create({
      collection: "submissions",
      data: {
        formType: "cv-submission",
        name: data.name,
        email: data.email,
        message: `Area of Interest: ${data.interest}`,
        cvFile: data.cvFileId,
      },
    });

    return { success: true, message: "Your CV has been successfully uploaded to our talent pool!" };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to submit CV" };
  }
}

export async function searchAction(query: string) {
  try {
    if (!query || query.length < 2) return { success: true, results: [] };
    const payload = await getPayload({ config });
    
    const [pubs, podcasts, evs] = await Promise.all([
      payload.find({
        collection: "publications",
        where: {
          or: [
            { title: { like: query } },
            { excerpt: { like: query } },
          ],
        },
        limit: 5,
      }),
      payload.find({
        collection: "podcast-episodes",
        where: {
          or: [
            { title: { like: query } },
            { summary: { like: query } },
          ],
        },
        limit: 5,
      }),
      payload.find({
        collection: "events",
        where: {
          or: [
            { title: { like: query } },
            { location: { like: query } },
          ],
        },
        limit: 5,
      }),
    ]);

    const results = [
      ...pubs.docs.map((d: any) => ({
        id: d.id,
        type: "publication",
        title: d.title,
        excerpt: d.excerpt,
        url: `/research/${d.slug}`,
      })),
      ...podcasts.docs.map((d: any) => ({
        id: d.id,
        type: "podcast",
        title: d.title,
        excerpt: d.summary,
        url: `/media?episode=${d.id}`,
      })),
      ...evs.docs.map((d: any) => ({
        id: d.id,
        type: "event",
        title: d.title,
        excerpt: `${d.type} - ${d.location}`,
        url: `/events#${d.id}`,
      })),
    ];

    return { success: true, results };
  } catch (error: any) {
    console.error("Search error:", error);
    return { success: false, error: error.message || "Search failed" };
  }
}

