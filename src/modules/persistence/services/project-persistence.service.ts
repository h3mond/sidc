import { Inject, Injectable } from '@nestjs/common';
import { ProjectEntity } from '../../../core/domain/entities/project.entity';
import { CreateProjectPort } from '../../../core/domain/ports/out/project/create-project.port';
import { LoadProjectPort } from '../../../core/domain/ports/out/project/load-project.port';
import { ID } from '../../../core/shared/value-objects/id.value-object';
import { ProjectRepository } from '../repositories/project/project.repository';

@Injectable()
export class ProjectPersistenceService
  implements CreateProjectPort, LoadProjectPort {
  constructor(
    @Inject(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async createProject(project: ProjectEntity): Promise<ProjectEntity> {
    return await this.projectRepository.save(project);
  }

  async loadProject(accountId: ID, projectId: ID): Promise<ProjectEntity> {
    return await this.projectRepository.findOne({
      id: projectId,
      ownerId: accountId,
    });
  }

  async loadProjects(accountId: ID): Promise<ProjectEntity[]> {
    const projects = await this.projectRepository.findMany({
      ownerId: accountId,
    });
    return projects;
  }
}
