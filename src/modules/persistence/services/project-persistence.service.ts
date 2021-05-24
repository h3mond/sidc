import { Inject, Injectable } from '@nestjs/common';
import { ProjectEntity } from '../../../core/domain/entities/project.entity';
import { CreateProjectPort } from '../../../core/domain/ports/out/project/create-project.port';
import { ProjectRepository } from '../repositories/project/project.repository';

@Injectable()
export class ProjectPersistenceService implements CreateProjectPort {
  constructor(
    @Inject(ProjectRepository)
    private readonly projectRepository: ProjectRepository,
  ) {}

  async createProject(project: ProjectEntity): Promise<boolean> {
    const result = await this.projectRepository.save(project);
    return !!result;
  }
}
