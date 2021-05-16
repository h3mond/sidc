import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
  @ApiProperty({
    title: 'JWT Access token',
  })
  access_token: string;
}
