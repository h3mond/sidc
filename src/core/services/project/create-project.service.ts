import { ProjectEntity } from '../../domain/project/entity/project.entity';
import { CreateProjectPort } from '../../domain/project/ports/create-project.port';
import { CreateProjectCommand } from '../../domain/project/use-cases/create-project.command';
import { CreateProjectUseCase } from '../../domain/project/use-cases/create-project.use-case';

export class CreateProjectService implements CreateProjectUseCase {
  constructor(private readonly _createProjectPort: CreateProjectPort) {}

  async createProject(command: CreateProjectCommand): Promise<boolean> {
    const project = new ProjectEntity(command.project);
    return await this._createProjectPort.createProject(project);
  }
}
