import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { postgresAdapter } from "@payloadcms/db-postgres";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Import collections from payload directory
import { Team } from "./payload/collections/Team";
import { Publications } from "./payload/collections/Publications";
import { InFocus } from "./payload/collections/InFocus";
import { MagazineIssues } from "./payload/collections/MagazineIssues";
import { PodcastEpisodes } from "./payload/collections/PodcastEpisodes";
import { Documentaries } from "./payload/collections/Documentaries";
import { Events } from "./payload/collections/Events";
import { FocusAreas } from "./payload/collections/FocusAreas";
import { MembershipTiers } from "./payload/collections/MembershipTiers";
import { FAQs } from "./payload/collections/FAQs";
import { Partners } from "./payload/collections/Partners";
import { OpenRoles } from "./payload/collections/OpenRoles";
import { Gallery } from "./payload/collections/Gallery";
import { Members } from "./payload/collections/Members";
import { Submissions } from "./payload/collections/Submissions";
import { Media } from "./payload/collections/Media";

// Import globals from payload directory
import { SiteSettings } from "./payload/globals/SiteSettings";
import { Navigation } from "./payload/globals/Navigation";
import { Footer } from "./payload/globals/Footer";
import { ImpactStats } from "./payload/globals/ImpactStats";

const databaseUri = process.env.DATABASE_URI || "file:./payload.db";
const isPostgres = databaseUri.startsWith("postgres://") || databaseUri.startsWith("postgresql://");

export default buildConfig({
  admin: {
    user: "members",
    autoLogin:
      process.env.NODE_ENV === "development"
        ? {
            email: "admin@sdci.org.ng",
            password: "adminpassword",
            prefillOnly: true,
          }
        : false,
  },
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || "sdci_default_super_secret_key_12345",
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: databaseUri,
        },
      })
    : sqliteAdapter({
        client: {
          url: databaseUri,
        },
      }),
  collections: [
    Team,
    Publications,
    InFocus,
    MagazineIssues,
    PodcastEpisodes,
    Documentaries,
    Events,
    FocusAreas,
    MembershipTiers,
    FAQs,
    Partners,
    OpenRoles,
    Gallery,
    Members,
    Submissions,
    Media,
  ],
  globals: [SiteSettings, Navigation, Footer, ImpactStats],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  sharp,
});
