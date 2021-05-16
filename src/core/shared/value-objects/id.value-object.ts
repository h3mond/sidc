import { v4 as uuid4, validate, version } from 'uuid';
import { ValueObject } from '../base-classes/value-object.base';

export class ID extends ValueObject<string> {
  constructor(value: string) {
    super({ value });
  }

  public static generate(): ID {
    return new ID(uuid4());
  }

  public validate(): boolean {
    return validate(this.value) && version(this.value) === 4;
  }
}
