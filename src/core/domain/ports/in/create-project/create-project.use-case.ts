import { CreateProjectCommand } from './create-project.command';

export const CreateProjectUseCaseSymbol = Symbol('CreateProjectUseCase');

export interface CreateProjectUseCase {
  createProject(command: CreateProjectCommand): Promise<boolean>;
}
