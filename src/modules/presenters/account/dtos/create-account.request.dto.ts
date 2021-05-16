import { ApiProperty } from '@nestjs/swagger';
import { AccountEntityProps } from '../../../../core/domain/entities/account.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccountRequest implements AccountEntityProps {
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of user' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Surname of user' })
  surname: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john@example.com',
    description: 'Email of user',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Password of user' })
  password: string;
}
