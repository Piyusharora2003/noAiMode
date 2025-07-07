export default interface ContentOriginDetectorServiceInterface {
  isAiGeneratedContent(content: string): Promise<number>;
}
