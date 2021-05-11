import { CreateDateColumn, PrimaryColumn } from 'typeorm';

export abstract class TypeOrmEntityBase {
  constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  @PrimaryColumn({ update: false })
  id: string;

  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;
}
