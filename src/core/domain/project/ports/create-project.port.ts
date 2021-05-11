import { ProjectEntity } from '../entity/project.entity';

export interface CreateProjectPort {
  createProject(command: ProjectEntity): Promise<boolean>;
}
