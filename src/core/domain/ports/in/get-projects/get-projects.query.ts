import { ID } from '../../../../shared/value-objects/id.value-object';
import { ProjectEntity } from '../../../entities/project.entity';

export interface GetProjectsQuery {
  getProjects(accountId: ID): Promise<ProjectEntity[]>;
}
