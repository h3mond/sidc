import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRequest {
  @ApiProperty({
    title: 'Account email',
    example: 'john@mail.kz',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    title: 'Account password',
    example: 'password',
  })
  @IsNotEmpty()
  password: string;
}
