import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRequest {
  @ApiProperty({
    description: 'Account email',
    example: 'john@mail.kz',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Account password',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}
