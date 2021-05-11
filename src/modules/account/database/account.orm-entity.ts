import { Column, Entity } from 'typeorm';
import { TypeOrmEntityBase } from '../../../infra/database/base-classes/typeorm.entity.base';

@Entity({ name: 'accounts' })
export class AccountOrmEntity extends TypeOrmEntityBase {
  constructor(props?: AccountOrmEntity) {
    super(props);
  }

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  password: string;
}
