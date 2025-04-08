import { Test, TestingModule } from '@nestjs/testing';
import { TextAiInterfaceController } from './text-ai-interface.controller';

describe('TextAiInterfaceController', () => {
  let controller: TextAiInterfaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextAiInterfaceController],
    }).compile();

    controller = module.get<TextAiInterfaceController>(TextAiInterfaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
