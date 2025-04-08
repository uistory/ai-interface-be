import { Module } from '@nestjs/common';
import { TextAiInterfaceModule } from 'src/modules/text-ai-interface/text-ai-interface.module';

@Module({
  imports: [TextAiInterfaceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
