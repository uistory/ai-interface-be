import { Test, TestingModule } from '@nestjs/testing';
import { TextAiInterfaceService } from './text-ai-interface.service';

describe('TextAiInterfaceServiceService', () => {
  let service: TextAiInterfaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TextAiInterfaceService],
    }).compile();

    service = module.get<TextAiInterfaceService>(TextAiInterfaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
