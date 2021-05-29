import { GetProjectsQuery } from '../../../../../core/domain/ports/in/get-projects/get-projects.query';
import { ProjectEntity } from '../../../../../core/domain/entities/project.entity';
import { ID } from '../../../../../core/shared/value-objects/id.value-object';
import { LoadProjectPort } from '../../../../../core/domain/ports/out/project/load-project.port';

export class GetProjectsService implements GetProjectsQuery {
  constructor(private readonly loadProjectPort: LoadProjectPort) {}

  async getProjects(accountId: ID): Promise<ProjectEntity[]> {
    return await this.loadProjectPort.loadProjects(accountId);
  }
}
