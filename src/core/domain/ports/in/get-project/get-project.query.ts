import { ID } from '../../../../shared/value-objects/id.value-object';
import { ProjectEntity } from '../../../entities/project.entity';

export interface GetProjectQuery {
  getProject(acountId: ID, projectId: ID): Promise<ProjectEntity>;
}
