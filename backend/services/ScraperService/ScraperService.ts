import axios from "axios";
import * as cheerio from "cheerio";
import { SearchResult } from "../../types/search";
import { StringUtils } from "../../helpers/StringUtils";

export class ScraperService {
  public async extractTextFromUrl(urlKeyDto: SearchResult): Promise<void> {
    try {
      const response = await axios.get(urlKeyDto.url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
        timeout: 7000,
      });

      const $ = cheerio.load(response.data);
      const text = $("p")
        .map((_, el) => $(el).text().trim())
        .get()
        .join("\n\n");
      if (!StringUtils.isEmpty(text)) {
        urlKeyDto.data = text;
      }
    } catch (err: any) {
      console.error(`Scraping failed for ${urlKeyDto.url}:`, err?.message);
    }
  }

  public async extractFromMultipleUrls(
    urlKeyDtos: SearchResult[]
  ): Promise<void> {
    await Promise.all(
      urlKeyDtos.map((urlKeyDto) => this.extractTextFromUrl(urlKeyDto))
    );
  }
}
