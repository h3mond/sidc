import { ProjectEntity } from '../../../entities/project.entity';

export interface CreateProjectPort {
  createProject(project: ProjectEntity): Promise<boolean>;
}
