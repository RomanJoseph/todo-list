import {
  Entity,
  Column
} from 'typeorm';

import { PrimaryEntity } from '../../../../../shared/infra/typeorm/PrimaryEntity';
import { TaskStatusEnum } from '@modules/tasks/enum/TaskStatusEnum';

@Entity('tasks')
export class Task extends PrimaryEntity {
    @Column({ name: 'user_id'})
    user_id: string;

    @Column({ name: 'title' })
    title: string;

    @Column({ name: 'description' })
    description: string;

    @Column({ name: 'status', type: 'varchar' })
    status: TaskStatusEnum;
}