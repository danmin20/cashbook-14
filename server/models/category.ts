import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { History } from './history';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ type: 'varchar', length: 31 })
  name!: string;

  @Column({ type: 'varchar', length: 7 })
  type!: string;

  @Column({ type: 'varchar', length: 7 })
  color!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.categories)
  user!: User;

  @OneToMany(() => History, (history) => history.category)
  histories!: History[];
}
