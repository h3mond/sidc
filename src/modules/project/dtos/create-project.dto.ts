import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    title: 'Project name',
  })
  @IsNotEmpty()
  name: string;
}
