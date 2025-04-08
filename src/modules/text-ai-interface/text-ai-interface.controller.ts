import { Body, Controller, Post } from '@nestjs/common';
import { GenerateRecipeRequestDto } from 'src/modules/text-ai-interface/dtos/prompt.dto';
import { TextAiInterfaceService } from './text-ai-interface.service';

@Controller('text-ai-interface')
export class TextAiInterfaceController {
  constructor(private textAiInterfaceService: TextAiInterfaceService) {}

  @Post()
  async create(@Body() request: GenerateRecipeRequestDto) {
    const res = await this.textAiInterfaceService.getAiResponse(
      request.ingredients.join(),
    );
    return res;
  }
}
