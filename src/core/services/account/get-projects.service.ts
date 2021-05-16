import { GetProjectsQuery } from '../../domain/ports/in/get-projects/get-projects.query';
import { ProjectEntity } from '../../domain/entities/project.entity';
import { ID } from '../../shared/value-objects/id.value-object';
import { LoadAccountPort } from '../../domain/ports/out/account/load-account.port';

export class GetProjectsService implements GetProjectsQuery {
  constructor(private readonly loadAccountPort: LoadAccountPort) {}

  async getProjects(accountId: ID): Promise<ProjectEntity[]> {
    const account = await this.loadAccountPort.loadAccountProjects(
      accountId.value,
    );
    return account.projects;
  }
}
