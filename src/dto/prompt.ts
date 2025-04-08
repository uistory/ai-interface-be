import { ApiProperty } from "@nestjs/swagger";

export class PromptDto {
  @ApiProperty()
  text: string;
}
