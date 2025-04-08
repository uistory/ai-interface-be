import { ApiProperty } from '@nestjs/swagger';

export class GenerateRecipeRequestDto {
  @ApiProperty()
  ingredients: string[];
}
