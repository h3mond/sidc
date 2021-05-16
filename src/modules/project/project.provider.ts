import { Provider } from '@nestjs/common';
import { CreateProjectService } from '../../core/services/project/create-project.service';
import { ProjectRepository } from './database/project.repository';

export const createProjectSymbol = Symbol('createProject');
export const createProjectProvider: Provider = {
  provide: createProjectSymbol,
  useFactory: (repository: ProjectRepository): CreateProjectService => {
    return new CreateProjectService(repository);
  },
  inject: [ProjectRepository],
};
