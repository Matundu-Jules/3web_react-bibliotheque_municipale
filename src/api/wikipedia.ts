export interface WikiSummary {
  extract: string;
  content_urls: { desktop: { page: string } };
  thumbnail?: { source: string };
}

export async function getWikipediaSummary(title: string): Promise<WikiSummary | null> {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`);
  if (!response.ok) {
    return null;
  }
  return response.json();
}
