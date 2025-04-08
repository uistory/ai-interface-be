import { Body, Controller, Post } from '@nestjs/common';
import { PromptDto } from 'src/dto/prompt';
import { TextAiInterfaceService } from '../services/text-ai-interface/text-ai-interface.service';

@Controller('text-ai-interface')
export class TextAiInterfaceController {
  constructor(private textAiInterfaceService: TextAiInterfaceService) {}

  @Post()
  async create(@Body() prompt: PromptDto) {
    const res = await this.textAiInterfaceService.getAiResponse(prompt.text);
    return res;
  }
}
