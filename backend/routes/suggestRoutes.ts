import express from "express";
import { HTTPCodes } from "../constants/constants";
import { SeedService } from "../services/SeedURLsService/SeedServiceImpl";
import { MockSeedService } from "../services/SeedURLsService/mockSeedService";
import { SeedServiceInterface } from "../interfaces/SeedServiceInterface";
import { ScraperService } from "../services/ScraperService/ScraperService";

const router = express.Router();

const seedService: SeedServiceInterface = MockSeedService.getInstance();
// const seedService: SeedServiceInterface = SeedService.getInstance();

const scraper = new ScraperService();

router.post("/", async (req: any, res: any) => {
  const { query } = req.body;
  if (!query) {
    return res
      .status(HTTPCodes.BAD_REQUEST)
      .json({ error: "Query for suggestion required" });
  }
  try {
    const querySuggestions: string[] | null = await seedService.getSuggestions(
      query
    );
    if (!querySuggestions) {
      throw new Error("No suggestions recieved from Seed Service");
    }

    res.status(HTTPCodes.OK).json({ suggestions: querySuggestions });
  } catch (error: any) {
    console.error("Search error:", error?.message);
    res.status(HTTPCodes.OK).json({ suggestions: null });
  }
});

export default router;
