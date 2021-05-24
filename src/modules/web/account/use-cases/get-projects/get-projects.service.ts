import { GetProjectsQuery } from '../../../../../core/domain/ports/in/get-projects/get-projects.query';
import { ProjectEntity } from '../../../../../core/domain/entities/project.entity';
import { ID } from '../../../../../core/shared/value-objects/id.value-object';
import { LoadAccountPort } from '../../../../../core/domain/ports/out/account/load-account.port';

export class GetProjectsService implements GetProjectsQuery {
  constructor(private readonly loadAccountPort: LoadAccountPort) {}

  async getProjects(accountId: ID): Promise<ProjectEntity[]> {
    const account = await this.loadAccountPort.loadAccountProjects(
      accountId.value,
    );
    account.password = undefined;
    return account.projects;
  }
}
