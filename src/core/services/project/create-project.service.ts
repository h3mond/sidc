import { ProjectEntity } from '../../domain/entities/project.entity';
import { CreateProjectCommand } from '../../domain/ports/in/create-project/create-project.command';
import { CreateProjectUseCase } from '../../domain/ports/in/create-project/create-project.use-case';
import { CreateProjectPort } from '../../domain/ports/out/project/create-project.port';

export class CreateProjectService implements CreateProjectUseCase {
  constructor(private readonly _createProjectPort: CreateProjectPort) {}

  async createProject(command: CreateProjectCommand): Promise<boolean> {
    const project = new ProjectEntity(command.project);
    return await this._createProjectPort.createProject(project);
  }
}
