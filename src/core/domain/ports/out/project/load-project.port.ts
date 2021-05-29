import { ID } from '../../../../shared/value-objects/id.value-object';
import { ProjectEntity } from '../../../entities/project.entity';

export interface LoadProjectPort {
  loadProject(accountId: ID, projectId: ID): Promise<ProjectEntity>;
  loadProjects(accountId: ID): Promise<ProjectEntity[]>;
}
