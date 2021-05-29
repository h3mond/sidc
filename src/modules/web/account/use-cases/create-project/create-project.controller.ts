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
} from '@nestjs/swagger';
import { CreateProjectCommand } from '../../../../../core/domain/ports/in/create-project/create-project.command';
import { CreateProjectService } from './create-project.service';
import { routes } from '../../../../../infra/configs/app.routes';
import { Account } from '../../../auth/decorators/account.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { AccountIdentity } from '../../../auth/passport/types';
import { CreateProjectSymbol } from '../../account.provider';
import { CreateProjectRequest } from '../../dtos/create-project.request.dto';
import { ProjectResponse } from '../../dtos/get-project.response.dto';

@ApiTags('Project')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
@ApiBadRequestResponse()
@ApiInternalServerErrorResponse()
export class CreateProjectController {
  constructor(
    @Inject(CreateProjectSymbol)
    private readonly createProjectService: CreateProjectService,
  ) {}

  @Post(routes.project.create)
  @ApiOperation({ summary: 'Create project' })
  @ApiCreatedResponse({ type: ProjectResponse })
  async createProject(
    @Account() account: AccountIdentity,
    @Body() projectDto: CreateProjectRequest,
  ): Promise<ProjectResponse> {
    const command = new CreateProjectCommand({
      ownerId: account.id,
      name: projectDto.name,
      clientSecret: null,
    });
    const result = await this.createProjectService.createProject(command);
    if (result === undefined) {
      throw new InternalServerErrorException();
    }
    const response = new ProjectResponse();
    response.id = result.id.value;
    response.name = result.name;
    response.createdAt = result.createdAt.value.toUTCString();
    response.clientSecret = result.clientSecret.value;

    return response;
  }
}
