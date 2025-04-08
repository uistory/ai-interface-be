import { ApiProperty } from '@nestjs/swagger';

export class PromptDto {
  @ApiProperty()
  ingredients: string[];
}
