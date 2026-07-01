export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return "";
  return url.replace("/api/media/file/", "/uploads/");
}
