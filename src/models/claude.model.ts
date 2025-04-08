import { Injectable } from '@nestjs/common';
import { IAiModel } from '../interfaces/ai-model.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ClaudeModel implements IAiModel {
  constructor(private readonly configService: ConfigService) {}

  async generateResponse(prompt: string, context?: any): Promise<string> {
    // Implementation for Claude model would go here
    // This is just a placeholder
    return `Claude model response for: ${prompt}`;
  }
}
