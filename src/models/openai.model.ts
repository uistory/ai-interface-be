import { Injectable } from '@nestjs/common';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { IAiModel } from '../interfaces/ai-model.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiModel implements IAiModel {
  private readonly model: ChatOpenAI;

  constructor(private readonly configService: ConfigService) {
    this.model = new ChatOpenAI({
      apiKey: this.configService.get<string>('OPEN_AI_API_KEY'),
      model: this.configService.get<string>('GPT_MODEL', 'gpt-4o-mini'),
      maxTokens: 2000,
      temperature: 0.7,
    });
  }

  async generateResponse(prompt: string, ingredients: string): Promise<string> {
    const systemTemplate =
      'You are a helpful assistant that suggests recipes based on the given ingredients. Respond with a list of possible recipes.';

    const promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', systemTemplate],
      ['user', prompt],
    ]);

    const parser = new StringOutputParser();
    const chain = promptTemplate.pipe(this.model).pipe(parser);

    return chain.invoke({ ingredients: ingredients });
  }
}
