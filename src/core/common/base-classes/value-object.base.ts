interface ValueObjectProps<T> {
  value: T;
}

export abstract class ValueObject<T> {
  protected readonly props: ValueObjectProps<T>;

  constructor(props: ValueObjectProps<T>) {
    this.props = props;
  }

  get value(): T {
    return this.props.value;
  }
}
