import { ProjectEntity } from '../entity/project.entity';

export interface CreateProjectPort {
  createProject(project: ProjectEntity): Promise<boolean>;
}
