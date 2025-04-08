export interface IAiModel {
  generateResponse(prompt: string, context?: any): Promise<string>;
}
