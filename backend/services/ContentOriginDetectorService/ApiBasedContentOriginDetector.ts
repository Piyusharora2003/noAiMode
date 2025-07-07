import { Constants } from "../../constants/constants";
import ContentOriginDetectorServiceInterface from "./ContentOriginDetectorServiceInterface";
import axios from "axios";
export default class ApiBasedContentOriginDetector
  implements ContentOriginDetectorServiceInterface
{
  private static instance: ApiBasedContentOriginDetector | undefined;

  public static getInstance(): ApiBasedContentOriginDetector {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new ApiBasedContentOriginDetector());
  }

  public async isAiGeneratedContent(content: string): Promise<number> {
    if (!content) {
      return 1;
    }
    try {
      const response = await axios.post(
        Constants.GPTZERO_API_URL,
        {
          document: {
            text: content,
          },
        },
        {
          headers: {
            "X-Api-Key": process.env.GPTZERO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const probabilityOfBeingAiGenerated: number =
        response.data.documents[0].completely_generated_prob;
      return probabilityOfBeingAiGenerated;
    } catch (error) {
      console.error("GPTZero detection failed:", error);
      return 1;
    }
  }
}
