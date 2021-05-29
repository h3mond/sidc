import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountResponse {
  @ApiProperty({ title: 'Temp key of user' })
  key: string;
}
