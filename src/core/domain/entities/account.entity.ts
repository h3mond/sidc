import { EntityBase } from '../../shared/base-classes/entity.base';
import { ProjectEntity } from './project.entity';

export interface AccountEntityProps {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export class AccountEntity extends EntityBase<AccountEntityProps> {
  constructor(props: AccountEntityProps) {
    super(props);
  }

  protected _projects: ProjectEntity[];

  addProject(project: ProjectEntity) {
    this._projects.push(project);
  }

  get projects() {
    return this.projects;
  }

  get name(): string {
    return this.props.name;
  }

  get surname(): string {
    return this.props.surname;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }
}
