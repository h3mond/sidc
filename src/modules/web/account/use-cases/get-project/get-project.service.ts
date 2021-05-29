import { NotFoundException } from '@nestjs/common';
import { ProjectEntity } from '../../../../../core/domain/entities/project.entity';
import { GetProjectQuery } from '../../../../../core/domain/ports/in/get-project/get-project.query';
import { LoadProjectPort } from '../../../../../core/domain/ports/out/project/load-project.port';
import { ID } from '../../../../../core/shared/value-objects/id.value-object';

export class GetProjectService implements GetProjectQuery {
  constructor(private readonly loadProjectPort: LoadProjectPort) {}

  async getProject(accountId: ID, projectId: ID): Promise<ProjectEntity> {
    const result = await this.loadProjectPort.loadProject(accountId, projectId);
    if (result === undefined) {
      throw new NotFoundException();
    }
    return result;
  }
}
