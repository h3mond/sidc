import { Column, Entity } from 'typeorm';
import { TypeOrmEntityBase } from '../../../infra/database/base-classes/typeorm.entity.base';

@Entity({ name: 'projects' })
export class ProjectOrmEntity extends TypeOrmEntityBase {
  constructor(props?: ProjectOrmEntity) {
    super(props);
  }

  @Column({ name: 'owner_id' })
  ownerId: string;

  @Column()
  name: string;

  @Column({ name: 'client_secret' })
  clientSecret: string;
}
