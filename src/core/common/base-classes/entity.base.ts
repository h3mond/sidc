import { ID } from '../value-objects/id.value-object';
import { DateVO } from '../value-objects/date.value-object';

export interface EntityBaseProps {
  id: ID;
  createdAt: DateVO;
}

export abstract class EntityBase<T> {
  protected readonly _id: ID;
  protected readonly _createdAt: DateVO;
  protected readonly props: T;

  constructor(props: T) {
    this._id = ID.generate();
    this._createdAt = DateVO.now();
    this.props = props;
  }

  get id(): ID {
    return this._id;
  }

  get createdAt(): DateVO {
    return this._createdAt;
  }
}
