import { SearchResult } from "../../types/search";
import { SeedServiceInterface } from "../../interfaces/SeedServiceInterface";

export class MockSeedService implements SeedServiceInterface {
  querySuggestionMap: Map<string, string[]> = new Map();
  private static instance: MockSeedService | undefined;
  constructor() {
    this.fillQuerySuggestionMap();
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new MockSeedService());
  }

  public async handleSearchQuery(
    query: string
  ): Promise<SearchResult[] | null> {
    console.log(`Mock service called with query: "${query}"`);

    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            title: "dmaxon Career",
            url: "https://www.dmaxon.jobs/en/jobs/3015604/software-dev-engineer-i-dmaxon-university-talent-acquisition",
            description: "Explore opportunities at dmaxon.",
            domain: "dmaxon.jobs",
          },
          {
            title: "dmaxon Career",
            url: "https://www.dmaxon.jobs/en/jobs/3015604/software-dev-engineer-i-dmaxon-university-talent-acquisition",
            description: "Explore opportunities at dmaxon.",
            domain: "dmaxon.jobs",
          },
          {
            title: "dmaxon Career",
            url: "https://www.ddmaxon.jobs/en/jobs/3015604/software-dev-engineer-i-dmaxon-university-talent-acquisition",
            description: "Explore opportunities at dmaxon.",
            domain: "dmaxon.jobs",
          },
          {
            title: "dmaxon Career",
            url: "https://www.dmaxon.jobs/en/jobs/3015604/software-dev-engineer-i-dmaxon-university-talent-acquisition",
            description: "Explore opportunities at dmaxon.",
            domain: "dmaxon.jobs",
          },
          {
            title: "dmaxon Career",
            url: "https://www.dmaxon.jobs/en/jobs/3015604/software-dev-engineer-i-dmaxon-university-talent-acquisition",
            description: "Explore opportunities at dmaxon.",
            domain: "dmaxon.jobs",
          },
          {
            title: "dmaxon Career",
            url: "https://www.dmaxon.jobs/en/jobs/3015604/software-dev-engineer-i-dmaxon-university-talent-acquisition",
            description: "Explore opportunities at dmaxon.",
            domain: "dmaxon.jobs",
          },
          {
            title: "Java Optimization Guide",
            url: "https://medium.com/@hxu0407/java-optimization-7000ms-90ms-837d647c59ae",
            description: "Optimizing Java code with performance tips.",
            domain: "medium.com",
          },
          {
            title: "Wikipedia Main Page",
            url: "https://en.wikipedia.org/wiki/Main_Page",
            description: "The Free Encyclopedia.",
            domain: "en.wikipedia.org",
          },
        ];

        resolve(mockResults);
      }, 3000); // 3-second simulated delay
    });
  }

  public async getSuggestions(query: string): Promise<string[] | null> {
    console.log("mock service called for query: ", query);
    return new Promise((resolve) => {
      resolve(this.querySuggestionMap.get(query) ?? null);
    });
  }

  fillQuerySuggestionMap() {
    this.querySuggestionMap.set("hello", [
      "hello world",
      "hello chat gpt",
      "hello kitty",
      "hello fresh",
      "hello darkness my old friend",
    ]);

    this.querySuggestionMap.set("java", [
      "java vs javascript",
      "java download",
      "java interview questions",
      "java spring boot",
      "java map vs hashmap",
    ]);

    this.querySuggestionMap.set("ai", [
      "ai generated art",
      "ai tools",
      "ai in healthcare",
      "ai vs machine learning",
      "ai websites 2025",
    ]);
  }
}
