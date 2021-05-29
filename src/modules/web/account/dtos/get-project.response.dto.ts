import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponse {
  @ApiProperty({ type: 'uuid' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty({ type: 'uuid' })
  clientSecret: string;
}
