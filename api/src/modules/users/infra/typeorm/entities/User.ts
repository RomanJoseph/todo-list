import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

import { PrimaryEntity } from '../../../../../shared/infra/typeorm/PrimaryEntity';

@Entity('users')
export class User extends PrimaryEntity {
  @Column({ name: 'email' })
  email: string;

  @Exclude()
  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'name' })
  name: string;
}
