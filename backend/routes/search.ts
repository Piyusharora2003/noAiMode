import express from "express";
import { HTTPCodes } from "../constants/constants";
import { SeedService } from "../services/SeedURLsService/SeedServiceImpl";
import { MockSeedService } from "../services/SeedURLsService/mockSeedService";
import { SeedServiceInterface } from "../interfaces/SeedServiceInterface";
import { ScraperService } from "../services/ScraperService/ScraperService";
import { SearchResult } from "../types/search";

const router = express.Router();

const seedService: SeedServiceInterface = MockSeedService.getInstance();
// const seedService: SeedServiceInterface = SeedService.getInstance();

const scraper = new ScraperService();

router.post("/", async (req: any, res: any) => {
  const { query } = req.body;
  if (!query) {
    return res.status(HTTPCodes.BAD_REQUEST).json({ error: "Query required" });
  }
  try {
    const seedUrls: SearchResult[] | null = await seedService.handleSearchQuery(
      query
    );
    if (!seedUrls) {
      throw new Error("No seed urls recieved from Seed Service");
    }

    await scraper.extractFromMultipleUrls(seedUrls);

    res.status(HTTPCodes.OK).json(seedUrls);
  } catch (error: any) {
    console.error("Search error:", error?.message);
    res
      .status(HTTPCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "something went wrong" });
  }
});

export default router;
