import {
  Controller,
  HttpCode,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ID } from '../../../../../core/shared/value-objects/id.value-object';
import { routes } from '../../../../../infra/configs/app.routes';
import { Account } from '../../../auth/decorators/account.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { AccountIdentity } from '../../../auth/passport/types';
import { GetProjectSymbol } from '../../account.provider';
import { ProjectRequest } from '../../dtos/get-project.request.dto';
import { ProjectResponse } from '../../dtos/get-project.response.dto';
import { GetProjectService } from './get-project.service';

@ApiTags('Project')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class GetProjectController {
  constructor(
    @Inject(GetProjectSymbol)
    private readonly getProjectService: GetProjectService,
  ) {}

  @Post(routes.project.one)
  @HttpCode(200)
  @ApiOkResponse({ type: ProjectResponse })
  @ApiOperation({ summary: 'Get account project by UUID' })
  async getProject(
    @Account() account: AccountIdentity,
    @Query() project: ProjectRequest,
  ): Promise<ProjectResponse> {
    const proj = await this.getProjectService.getProject(
      account.id,
      new ID(project.id),
    );

    const response = new ProjectResponse();
    response.id = proj.id.value;
    response.name = proj.name;
    response.createdAt = proj.createdAt.value.toUTCString();
    response.clientSecret = proj.clientSecret.value;

    return response;
  }
}
