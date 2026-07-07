import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_team_department" AS ENUM('board', 'exec', 'research-policy', 'partnerships', 'stakeholder', 'hr-ops', 'legal', 'media-production');
  CREATE TYPE "public"."enum_publications_format" AS ENUM('brief', 'report', 'working-paper', 'white-paper');
  CREATE TYPE "public"."enum_events_type" AS ENUM('conference', 'seminar', 'forum', 'webinar', 'lecture', 'roundtable', 'launch');
  CREATE TYPE "public"."enum_events_format" AS ENUM('in-person', 'online', 'hybrid');
  CREATE TYPE "public"."enum_focus_areas_sdg_tags" AS ENUM('sdg1', 'sdg3', 'sdg4', 'sdg5', 'sdg6', 'sdg7', 'sdg8', 'sdg9', 'sdg10', 'sdg12', 'sdg13', 'sdg16', 'sdg17');
  CREATE TYPE "public"."enum_open_roles_type" AS ENUM('full-time', 'part-time', 'contract', 'internship');
  CREATE TYPE "public"."enum_gallery_type" AS ENUM('picture', 'video');
  CREATE TYPE "public"."enum_submissions_form_type" AS ENUM('newsletter', 'consultation', 'contact', 'cv-submission');
  CREATE TYPE "public"."enum_submissions_engagement_type" AS ENUM('research', 'training', 'advisory', 'evaluation', 'other');
  CREATE TABLE "team" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"department" "enum_team_department" NOT NULL,
  	"photo_id" integer,
  	"bio" jsonb,
  	"cv_file_id" integer,
  	"linkedin" varchar,
  	"email" varchar,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "publications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"format" "enum_publications_format" NOT NULL,
  	"excerpt" varchar,
  	"body" jsonb,
  	"cover_id" integer,
  	"attachment_id" integer,
  	"publish_date" timestamp(3) with time zone NOT NULL,
  	"gated" boolean DEFAULT false,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "publications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"focus_areas_id" integer,
  	"team_id" integer
  );
  
  CREATE TABLE "in_focus" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"related_publication_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "in_focus_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"focus_areas_id" integer
  );
  
  CREATE TABLE "magazine_issues" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"issue_no" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"cover_id" integer NOT NULL,
  	"theme_id" integer,
  	"free_excerpt" jsonb,
  	"gated_body" jsonb,
  	"gated_p_d_f_id" integer,
  	"publish_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "podcast_episodes_key_takeaways" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"point" varchar NOT NULL
  );
  
  CREATE TABLE "podcast_episodes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"audio_embed" varchar,
  	"platform_links_spotify" varchar,
  	"platform_links_apple" varchar,
  	"platform_links_youtube" varchar,
  	"platform_links_audiomack" varchar,
  	"platform_links_rss" varchar,
  	"summary" varchar NOT NULL,
  	"duration" varchar,
  	"cover_id" integer,
  	"transcript" jsonb,
  	"publish_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "podcast_episodes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_id" integer
  );
  
  CREATE TABLE "documentaries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"video_embed" varchar NOT NULL,
  	"about" varchar NOT NULL,
  	"length" varchar,
  	"year" varchar DEFAULT '2026',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "documentaries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"publications_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type" "enum_events_type" NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"location" varchar,
  	"format" "enum_events_format" NOT NULL,
  	"description" jsonb,
  	"registration_u_r_l" varchar,
  	"image_id" integer,
  	"recording" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "focus_areas_sdg_tags" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_focus_areas_sdg_tags",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "focus_areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "membership_tiers_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE "membership_tiers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"audience" varchar,
  	"price_n_g_n" numeric NOT NULL,
  	"price_u_s_d" numeric NOT NULL,
  	"cta_label" varchar DEFAULT 'Become a member',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"order" numeric DEFAULT 10,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer,
  	"url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "open_roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"department" varchar,
  	"location" varchar DEFAULT 'Bauchi, Nigeria',
  	"type" "enum_open_roles_type" NOT NULL,
  	"deadline" timestamp(3) with time zone,
  	"body" jsonb,
  	"apply_u_r_l" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "gallery" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"type" "enum_gallery_type" NOT NULL,
  	"image_id" integer,
  	"video_url" varchar,
  	"publish_date" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "members_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"tier_id" integer,
  	"paid_until" timestamp(3) with time zone,
  	"paystack_ref" varchar,
  	"is_admin" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_type" "enum_submissions_form_type" NOT NULL,
  	"name" varchar,
  	"email" varchar NOT NULL,
  	"organisation" varchar,
  	"message" varchar,
  	"cv_file_id" integer,
  	"engagement_type" "enum_submissions_engagement_type",
  	"deliverables" varchar,
  	"timeline" varchar,
  	"budget" varchar,
  	"timestamp" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"team_id" integer,
  	"publications_id" integer,
  	"in_focus_id" integer,
  	"magazine_issues_id" integer,
  	"podcast_episodes_id" integer,
  	"documentaries_id" integer,
  	"events_id" integer,
  	"focus_areas_id" integer,
  	"membership_tiers_id" integer,
  	"faqs_id" integer,
  	"partners_id" integer,
  	"open_roles_id" integer,
  	"gallery_id" integer,
  	"members_id" integer,
  	"submissions_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"members_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT 'SDCI' NOT NULL,
  	"description" varchar DEFAULT 'Sustainable Development Conversations Initiative',
  	"logo_id" integer,
  	"registration_number" varchar DEFAULT '[RC/registration number]',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navigation_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"newsletter_microcopy" varchar DEFAULT 'Get our briefings and new episodes in your inbox. No spam, unsubscribe anytime.',
  	"socials_linkedin" varchar,
  	"socials_twitter" varchar,
  	"socials_youtube" varchar,
  	"socials_facebook" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "impact_stats" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"conversations" varchar DEFAULT '[X]' NOT NULL,
  	"publications" varchar DEFAULT '[X]' NOT NULL,
  	"partners" varchar DEFAULT '[X]' NOT NULL,
  	"reached" varchar DEFAULT '[X]' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "team" ADD CONSTRAINT "team_cv_file_id_media_id_fk" FOREIGN KEY ("cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications" ADD CONSTRAINT "publications_attachment_id_media_id_fk" FOREIGN KEY ("attachment_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "publications_rels" ADD CONSTRAINT "publications_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "in_focus" ADD CONSTRAINT "in_focus_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "in_focus" ADD CONSTRAINT "in_focus_related_publication_id_publications_id_fk" FOREIGN KEY ("related_publication_id") REFERENCES "public"."publications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "in_focus_rels" ADD CONSTRAINT "in_focus_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."in_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "in_focus_rels" ADD CONSTRAINT "in_focus_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "magazine_issues" ADD CONSTRAINT "magazine_issues_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazine_issues" ADD CONSTRAINT "magazine_issues_theme_id_focus_areas_id_fk" FOREIGN KEY ("theme_id") REFERENCES "public"."focus_areas"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "magazine_issues" ADD CONSTRAINT "magazine_issues_gated_p_d_f_id_media_id_fk" FOREIGN KEY ("gated_p_d_f_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcast_episodes_key_takeaways" ADD CONSTRAINT "podcast_episodes_key_takeaways_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."podcast_episodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "podcast_episodes" ADD CONSTRAINT "podcast_episodes_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "podcast_episodes_rels" ADD CONSTRAINT "podcast_episodes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."podcast_episodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "podcast_episodes_rels" ADD CONSTRAINT "podcast_episodes_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documentaries_rels" ADD CONSTRAINT "documentaries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."documentaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "documentaries_rels" ADD CONSTRAINT "documentaries_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "focus_areas_sdg_tags" ADD CONSTRAINT "focus_areas_sdg_tags_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "membership_tiers_features" ADD CONSTRAINT "membership_tiers_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."membership_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members_sessions" ADD CONSTRAINT "members_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_tier_id_membership_tiers_id_fk" FOREIGN KEY ("tier_id") REFERENCES "public"."membership_tiers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "submissions" ADD CONSTRAINT "submissions_cv_file_id_media_id_fk" FOREIGN KEY ("cv_file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_team_fk" FOREIGN KEY ("team_id") REFERENCES "public"."team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_publications_fk" FOREIGN KEY ("publications_id") REFERENCES "public"."publications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_in_focus_fk" FOREIGN KEY ("in_focus_id") REFERENCES "public"."in_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_magazine_issues_fk" FOREIGN KEY ("magazine_issues_id") REFERENCES "public"."magazine_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_podcast_episodes_fk" FOREIGN KEY ("podcast_episodes_id") REFERENCES "public"."podcast_episodes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documentaries_fk" FOREIGN KEY ("documentaries_id") REFERENCES "public"."documentaries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_membership_tiers_fk" FOREIGN KEY ("membership_tiers_id") REFERENCES "public"."membership_tiers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_open_roles_fk" FOREIGN KEY ("open_roles_id") REFERENCES "public"."open_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY ("gallery_id") REFERENCES "public"."gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_submissions_fk" FOREIGN KEY ("submissions_id") REFERENCES "public"."submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "navigation_links" ADD CONSTRAINT "navigation_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "team_photo_idx" ON "team" USING btree ("photo_id");
  CREATE INDEX "team_cv_file_idx" ON "team" USING btree ("cv_file_id");
  CREATE INDEX "team_updated_at_idx" ON "team" USING btree ("updated_at");
  CREATE INDEX "team_created_at_idx" ON "team" USING btree ("created_at");
  CREATE UNIQUE INDEX "publications_slug_idx" ON "publications" USING btree ("slug");
  CREATE INDEX "publications_cover_idx" ON "publications" USING btree ("cover_id");
  CREATE INDEX "publications_attachment_idx" ON "publications" USING btree ("attachment_id");
  CREATE INDEX "publications_updated_at_idx" ON "publications" USING btree ("updated_at");
  CREATE INDEX "publications_created_at_idx" ON "publications" USING btree ("created_at");
  CREATE INDEX "publications_rels_order_idx" ON "publications_rels" USING btree ("order");
  CREATE INDEX "publications_rels_parent_idx" ON "publications_rels" USING btree ("parent_id");
  CREATE INDEX "publications_rels_path_idx" ON "publications_rels" USING btree ("path");
  CREATE INDEX "publications_rels_focus_areas_id_idx" ON "publications_rels" USING btree ("focus_areas_id");
  CREATE INDEX "publications_rels_team_id_idx" ON "publications_rels" USING btree ("team_id");
  CREATE INDEX "in_focus_image_idx" ON "in_focus" USING btree ("image_id");
  CREATE INDEX "in_focus_related_publication_idx" ON "in_focus" USING btree ("related_publication_id");
  CREATE INDEX "in_focus_updated_at_idx" ON "in_focus" USING btree ("updated_at");
  CREATE INDEX "in_focus_created_at_idx" ON "in_focus" USING btree ("created_at");
  CREATE INDEX "in_focus_rels_order_idx" ON "in_focus_rels" USING btree ("order");
  CREATE INDEX "in_focus_rels_parent_idx" ON "in_focus_rels" USING btree ("parent_id");
  CREATE INDEX "in_focus_rels_path_idx" ON "in_focus_rels" USING btree ("path");
  CREATE INDEX "in_focus_rels_focus_areas_id_idx" ON "in_focus_rels" USING btree ("focus_areas_id");
  CREATE INDEX "magazine_issues_cover_idx" ON "magazine_issues" USING btree ("cover_id");
  CREATE INDEX "magazine_issues_theme_idx" ON "magazine_issues" USING btree ("theme_id");
  CREATE INDEX "magazine_issues_gated_p_d_f_idx" ON "magazine_issues" USING btree ("gated_p_d_f_id");
  CREATE INDEX "magazine_issues_updated_at_idx" ON "magazine_issues" USING btree ("updated_at");
  CREATE INDEX "magazine_issues_created_at_idx" ON "magazine_issues" USING btree ("created_at");
  CREATE INDEX "podcast_episodes_key_takeaways_order_idx" ON "podcast_episodes_key_takeaways" USING btree ("_order");
  CREATE INDEX "podcast_episodes_key_takeaways_parent_id_idx" ON "podcast_episodes_key_takeaways" USING btree ("_parent_id");
  CREATE INDEX "podcast_episodes_cover_idx" ON "podcast_episodes" USING btree ("cover_id");
  CREATE INDEX "podcast_episodes_updated_at_idx" ON "podcast_episodes" USING btree ("updated_at");
  CREATE INDEX "podcast_episodes_created_at_idx" ON "podcast_episodes" USING btree ("created_at");
  CREATE INDEX "podcast_episodes_rels_order_idx" ON "podcast_episodes_rels" USING btree ("order");
  CREATE INDEX "podcast_episodes_rels_parent_idx" ON "podcast_episodes_rels" USING btree ("parent_id");
  CREATE INDEX "podcast_episodes_rels_path_idx" ON "podcast_episodes_rels" USING btree ("path");
  CREATE INDEX "podcast_episodes_rels_team_id_idx" ON "podcast_episodes_rels" USING btree ("team_id");
  CREATE INDEX "documentaries_updated_at_idx" ON "documentaries" USING btree ("updated_at");
  CREATE INDEX "documentaries_created_at_idx" ON "documentaries" USING btree ("created_at");
  CREATE INDEX "documentaries_rels_order_idx" ON "documentaries_rels" USING btree ("order");
  CREATE INDEX "documentaries_rels_parent_idx" ON "documentaries_rels" USING btree ("parent_id");
  CREATE INDEX "documentaries_rels_path_idx" ON "documentaries_rels" USING btree ("path");
  CREATE INDEX "documentaries_rels_publications_id_idx" ON "documentaries_rels" USING btree ("publications_id");
  CREATE INDEX "events_image_idx" ON "events" USING btree ("image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "focus_areas_sdg_tags_order_idx" ON "focus_areas_sdg_tags" USING btree ("order");
  CREATE INDEX "focus_areas_sdg_tags_parent_idx" ON "focus_areas_sdg_tags" USING btree ("parent_id");
  CREATE INDEX "focus_areas_updated_at_idx" ON "focus_areas" USING btree ("updated_at");
  CREATE INDEX "focus_areas_created_at_idx" ON "focus_areas" USING btree ("created_at");
  CREATE INDEX "membership_tiers_features_order_idx" ON "membership_tiers_features" USING btree ("_order");
  CREATE INDEX "membership_tiers_features_parent_id_idx" ON "membership_tiers_features" USING btree ("_parent_id");
  CREATE INDEX "membership_tiers_updated_at_idx" ON "membership_tiers" USING btree ("updated_at");
  CREATE INDEX "membership_tiers_created_at_idx" ON "membership_tiers" USING btree ("created_at");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE INDEX "open_roles_updated_at_idx" ON "open_roles" USING btree ("updated_at");
  CREATE INDEX "open_roles_created_at_idx" ON "open_roles" USING btree ("created_at");
  CREATE INDEX "gallery_image_idx" ON "gallery" USING btree ("image_id");
  CREATE INDEX "gallery_updated_at_idx" ON "gallery" USING btree ("updated_at");
  CREATE INDEX "gallery_created_at_idx" ON "gallery" USING btree ("created_at");
  CREATE INDEX "members_sessions_order_idx" ON "members_sessions" USING btree ("_order");
  CREATE INDEX "members_sessions_parent_id_idx" ON "members_sessions" USING btree ("_parent_id");
  CREATE INDEX "members_tier_idx" ON "members" USING btree ("tier_id");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE UNIQUE INDEX "members_email_idx" ON "members" USING btree ("email");
  CREATE INDEX "submissions_cv_file_idx" ON "submissions" USING btree ("cv_file_id");
  CREATE INDEX "submissions_updated_at_idx" ON "submissions" USING btree ("updated_at");
  CREATE INDEX "submissions_created_at_idx" ON "submissions" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_team_id_idx" ON "payload_locked_documents_rels" USING btree ("team_id");
  CREATE INDEX "payload_locked_documents_rels_publications_id_idx" ON "payload_locked_documents_rels" USING btree ("publications_id");
  CREATE INDEX "payload_locked_documents_rels_in_focus_id_idx" ON "payload_locked_documents_rels" USING btree ("in_focus_id");
  CREATE INDEX "payload_locked_documents_rels_magazine_issues_id_idx" ON "payload_locked_documents_rels" USING btree ("magazine_issues_id");
  CREATE INDEX "payload_locked_documents_rels_podcast_episodes_id_idx" ON "payload_locked_documents_rels" USING btree ("podcast_episodes_id");
  CREATE INDEX "payload_locked_documents_rels_documentaries_id_idx" ON "payload_locked_documents_rels" USING btree ("documentaries_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_focus_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("focus_areas_id");
  CREATE INDEX "payload_locked_documents_rels_membership_tiers_id_idx" ON "payload_locked_documents_rels" USING btree ("membership_tiers_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_open_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("open_roles_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("submissions_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_members_id_idx" ON "payload_preferences_rels" USING btree ("members_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "navigation_links_order_idx" ON "navigation_links" USING btree ("_order");
  CREATE INDEX "navigation_links_parent_id_idx" ON "navigation_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "team" CASCADE;
  DROP TABLE "publications" CASCADE;
  DROP TABLE "publications_rels" CASCADE;
  DROP TABLE "in_focus" CASCADE;
  DROP TABLE "in_focus_rels" CASCADE;
  DROP TABLE "magazine_issues" CASCADE;
  DROP TABLE "podcast_episodes_key_takeaways" CASCADE;
  DROP TABLE "podcast_episodes" CASCADE;
  DROP TABLE "podcast_episodes_rels" CASCADE;
  DROP TABLE "documentaries" CASCADE;
  DROP TABLE "documentaries_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "focus_areas_sdg_tags" CASCADE;
  DROP TABLE "focus_areas" CASCADE;
  DROP TABLE "membership_tiers_features" CASCADE;
  DROP TABLE "membership_tiers" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "open_roles" CASCADE;
  DROP TABLE "gallery" CASCADE;
  DROP TABLE "members_sessions" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "submissions" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "navigation_links" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "impact_stats" CASCADE;
  DROP TYPE "public"."enum_team_department";
  DROP TYPE "public"."enum_publications_format";
  DROP TYPE "public"."enum_events_type";
  DROP TYPE "public"."enum_events_format";
  DROP TYPE "public"."enum_focus_areas_sdg_tags";
  DROP TYPE "public"."enum_open_roles_type";
  DROP TYPE "public"."enum_gallery_type";
  DROP TYPE "public"."enum_submissions_form_type";
  DROP TYPE "public"."enum_submissions_engagement_type";`)
}
