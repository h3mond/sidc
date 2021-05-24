import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class VerifyAccountRequest {
  @IsUUID(4)
  @ApiProperty({ description: 'Account temp key' })
  key: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Code' })
  code: string;
}
