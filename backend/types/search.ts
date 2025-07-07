export interface SearchResult {
  title: string;
  url: string;
  description: string;
  domain: string;
  confidenceScore?: number;
  data?: string;
}
