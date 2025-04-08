import { Injectable } from '@nestjs/common';
import { IAiModel } from '../interfaces/ai-model.interface';
import { OpenAiModel } from '../models/openai.model';
import { ClaudeModel } from '../models/claude.model';

export enum AiModelType {
  OPENAI = 'openai',
  CLAUDE = 'claude',
}

@Injectable()
export class AiModelFactory {
  constructor(
    private readonly openAiModel: OpenAiModel,
    private readonly claudeModel: ClaudeModel,
  ) {}

  createModel(type: AiModelType): IAiModel {
    switch (type) {
      case AiModelType.OPENAI:
        return this.openAiModel;
      case AiModelType.CLAUDE:
        return this.claudeModel;
      default:
        return this.openAiModel;
    }
  }
}
