import { Controller, HttpCode, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetProjectsService } from './get-projects.service';
import { routes } from '../../../../../infra/configs/app.routes';
import { Account } from '../../../auth/decorators/account.decorator';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { AccountIdentity } from '../../../auth/passport/types';
import { GetProjectsSymbol } from '../../account.provider';
import { ProjectResponse } from '../../dtos/get-project.response.dto';

@ApiTags('Project')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT')
export class GetProjectsController {
  constructor(
    @Inject(GetProjectsSymbol)
    private readonly getProjectsService: GetProjectsService,
  ) {}

  @Post(routes.project.all)
  @HttpCode(200)
  @ApiOkResponse({ type: [ProjectResponse] })
  @ApiOperation({ summary: 'Get account projects' })
  async getProjects(
    @Account() account: AccountIdentity,
  ): Promise<ProjectResponse[]> {
    const projects = await this.getProjectsService.getProjects(account.id);
    const response: ProjectResponse[] = projects.map((item) => {
      const proj = new ProjectResponse();
      proj.id = item.id.value;
      proj.name = item.name;
      proj.createdAt = item.createdAt.value.toUTCString();
      proj.clientSecret = item.clientSecret.value;
      return proj;
    });
    return response;
  }
}
