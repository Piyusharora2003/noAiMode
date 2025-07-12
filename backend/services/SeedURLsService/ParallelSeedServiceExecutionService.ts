import { SeedServiceInterface } from "../../interfaces/SeedServiceInterface";
import { SearchResult } from "../../types/search";
import { MockSeedService } from "./mockSeedService";
import { SeedService } from "./SeedServiceImpl";

export class ParallelSeedServiceExecutionService
  implements SeedServiceInterface
{
  private static instance: SeedServiceInterface;
  private seedServiceInstance: SeedServiceInterface;
  private mockSeedServiceInstance: SeedServiceInterface;

  private constructor() {
    this.seedServiceInstance = SeedService.getInstance();
    this.mockSeedServiceInstance = MockSeedService.getInstance();
  }

  public static getInstance(): SeedServiceInterface {
    if (!ParallelSeedServiceExecutionService.instance) {
      ParallelSeedServiceExecutionService.instance =
        new ParallelSeedServiceExecutionService();
    }
    return ParallelSeedServiceExecutionService.instance;
  }

  public async handleSearchQuery(
    query: string
  ): Promise<SearchResult[] | null> {
    console.log(
      "collecting seed urls for search query: ",
      query,
      " at ",
      new Date()
    );
    try {
      const [mockResults, seedResults] = await Promise.all([
        this.mockSeedServiceInstance.handleSearchQuery(query),
        this.seedServiceInstance.handleSearchQuery(query),
      ]);

      return [...(seedResults || []), ...(mockResults || [])];
    } catch (error) {
      console.error("Parallel search failed:", error);
      return [];
    }
  }

  public async getSuggestions(query: string): Promise<string[] | null> {
    console.log(
      "collecting seed urls for search query: ",
      query,
      " at ",
      new Date()
    );
    try {
      const [mockResults, seedResults] = await Promise.all([
        this.mockSeedServiceInstance.getSuggestions(query),
        this.seedServiceInstance.getSuggestions(query),
      ]);

      return [...(seedResults || []), ...(mockResults || [])];
    } catch (error) {
      console.error("Parallel search failed:", error);
      return [];
    }
  }
}
