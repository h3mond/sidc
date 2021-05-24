import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectResponse {
  @ApiProperty({ title: 'Temp key of user' })
  key: string;
}
