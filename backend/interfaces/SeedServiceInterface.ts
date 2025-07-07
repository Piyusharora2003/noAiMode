import { SearchResult } from "../types/search";

export interface SeedServiceInterface {
  handleSearchQuery(query: string): Promise<SearchResult[] | null>;
  getSuggestions(query: string): Promise<string[] | null>;
}
