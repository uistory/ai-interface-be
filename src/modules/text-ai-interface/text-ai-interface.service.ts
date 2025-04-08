import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { AiModelFactory, AiModelType } from 'src/factories/ai-model.factory';
import { recipePrompt } from 'src/modules/text-ai-interface/prompts/recipe-prompt';

@Injectable()
export class TextAiInterfaceService {
  constructor(private readonly aiModelFactory: AiModelFactory) {}

  public async getAiResponse(ingedients: string): Promise<string> {
    const modelType = AiModelType.OPENAI;
    const aiModel = this.aiModelFactory.createModel(modelType);
    return aiModel.generateResponse(recipePrompt, ingedients);
  }
}
