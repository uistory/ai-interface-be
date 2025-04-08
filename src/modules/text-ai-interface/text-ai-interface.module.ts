import { Module } from '@nestjs/common';
import { TextAiInterfaceService } from './text-ai-interface.service';
import { TextAiInterfaceController } from 'src/modules/text-ai-interface/text-ai-interface.controller';
import { OpenAiModel } from 'src/models/openai.model';
import { ClaudeModel } from 'src/models/claude.model';
import { AiModelFactory } from 'src/factories/ai-model.factory';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [TextAiInterfaceService, OpenAiModel, ClaudeModel, AiModelFactory],
  controllers: [TextAiInterfaceController],
  exports: [TextAiInterfaceService],
})
export class TextAiInterfaceModule {}
