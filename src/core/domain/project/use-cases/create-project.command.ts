import { ProjectEntityProps } from '../entity/project.entity';

export class CreateProjectCommand {
  constructor(private readonly _projectEntityProps: ProjectEntityProps) {}

  get project() {
    return this._projectEntityProps;
  }
}
