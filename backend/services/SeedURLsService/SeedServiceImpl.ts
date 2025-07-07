import axios from "axios";
import { SearchResult } from "../../types/search";
import { SeedServiceInterface } from "../../interfaces/SeedServiceInterface";
import { Constants } from "../../constants/constants";

export class SeedService implements SeedServiceInterface {
  private static instance: SeedServiceInterface;

  private constructor() {}

  public static getInstance(): SeedServiceInterface {
    if (!SeedService.instance) {
      SeedService.instance = new SeedService();
    }
    return SeedService.instance;
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
      const response = await axios.get(Constants.BRAVE_SEARCH_API_URL, {
        headers: {
          Accept: "application/json",
          "X-Subscription-Token": process.env.BRAVE_API_KEY!,
        },
        params: {
          q: query,
          count: 40,
        },
      });

      const results: SearchResult[] = response.data.web.results.map(
        (r: any) => ({
          title: r.title,
          url: r.url,
          description: r.description || "",
          domain: new URL(r.url).hostname,
        })
      );
      console.log("seed urls successfully recieved, count: ", results.length);
      return results;
    } catch (err: any) {
      console.error("error in getting seed urls");
      console.log("Brave API Error:", {
        message: err?.message,
        status: err?.response?.status,
        url: err?.config?.url,
      });
      return null;
    }
  }

  public async getSuggestions(query: string): Promise<string[] | null> {
    console.log("Finding suggestions for query:", query, "at", new Date());

    try {
      const response = await axios.get(Constants.BRAVE_SUGGEST_API_URL, {
        headers: {
          "X-Subscription-Token": process.env.BRAVE_API_KEY!,
          Accept: "application/json",
        },
        params: {
          q: query,
          count: 5,
        },
      });

      const suggestions: string[] = response.data.results.map(
        (r: any) => r.query
      );
      console.log("Suggestions received:", suggestions);
      return suggestions;
    } catch (error: any) {
      console.error("Error fetching suggestions:", {
        message: error?.message,
        status: error?.response?.status,
        url: error?.config?.url,
      });
      return null;
    }
  }
}
