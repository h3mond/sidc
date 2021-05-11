import { EntityBase } from '../../../common/base-classes/entity.base';
import { ID } from '../../../common/value-objects/id.value-object';

export interface ProjectEntityProps {
  ownerId: ID;
  name: string;
  accessToken: string;
  clientToken: string;
}

export class ProjectEntity extends EntityBase<ProjectEntityProps> {
  constructor(props: ProjectEntityProps) {
    super(props);
  }

  get name() {
    return this.props.name;
  }

  get ownerId() {
    return this.props.ownerId;
  }

  get accessToken() {
    return this.accessToken;
  }

  get clientToken() {
    return this.clientToken;
  }
}
