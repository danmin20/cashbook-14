import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';
import { Payment } from './payment';
import { Category } from './category';
import { History } from './history';

@Entity('user')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 31 })
  id!: string;

  @Column({ type: 'varchar', length: 31 })
  nickname!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => Payment, (payment) => payment.user)
  payments!: Payment[];

  @OneToMany(() => Category, (category) => category.user)
  categories!: Category[];

  @OneToMany(() => History, (history) => history.user)
  histories!: History[];
}
