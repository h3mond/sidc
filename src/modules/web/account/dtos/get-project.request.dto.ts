import { ApiProperty } from '@nestjs/swagger';

export class ProjectRequest {
  @ApiProperty()
  id: string;
}
