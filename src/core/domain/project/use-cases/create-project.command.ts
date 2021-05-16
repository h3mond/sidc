import { ID } from '../../../shared/value-objects/id.value-object';
import { ProjectEntityProps } from '../entity/project.entity';

export class CreateProjectCommand {
  constructor(private readonly _project: ProjectEntityProps) {
    this._project.clientSecret = ID.generate();
  }

  get project() {
    return this._project;
  }
}
