import {
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateProjectCommand } from '../../../../core/domain/project/use-cases/create-project.command';
import { CreateProjectService } from '../../../../core/services/project/create-project.service';
import { routes } from '../../../../infra/configs/app.routes';
import { Account } from '../../../auth/decorators/account.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { AccountIdentity } from '../../../auth/passport/types';
import { CreateProjectDto } from '../../dtos/create-project.dto';
import { createProjectSymbol } from '../../project.provider';

@Controller()
@UseGuards(JwtAuthGuard)
@ApiTags('Project')
@ApiBearerAuth('JWT')
@ApiBadRequestResponse()
@ApiUnauthorizedResponse()
export class CreateProjectController {
  constructor(
    @Inject(createProjectSymbol)
    private readonly createProjectService: CreateProjectService,
  ) {}

  @Post(routes.project.create)
  @ApiOperation({ summary: 'Create project' })
  @ApiCreatedResponse()
  @ApiInternalServerErrorResponse()
  async createProject(
    @Account() account: AccountIdentity,
    @Body() projectDto: CreateProjectDto,
  ) {
    const command = new CreateProjectCommand({
      ownerId: account.id,
      name: projectDto.name,
      clientSecret: null,
    });
    const result = await this.createProjectService.createProject(command);
    if (!result) {
      throw new InternalServerErrorException();
    }
  }
}
