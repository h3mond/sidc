import { EntityBase } from '../../../shared/base-classes/entity.base';
import { ID } from '../../../shared/value-objects/id.value-object';

export interface ProjectEntityProps {
  ownerId: ID;
  name: string;
  clientSecret: ID;
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

  get clientSecret() {
    return this.props.clientSecret;
  }
}
