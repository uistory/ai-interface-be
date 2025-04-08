import { Module } from '@nestjs/common';
import { TextAiInterfaceController } from './controllers/text-ai-interface.controller';
import { TextAiInterfaceService } from './services/text-ai-interface/text-ai-interface.service';

@Module({
  providers: [TextAiInterfaceService],
  controllers: [TextAiInterfaceController],
})
export class TextAiInterfaceModule {}
