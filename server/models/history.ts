import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Payment } from './payment';
import { Category } from './category';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ type: 'timestamp' })
  date!: Date;

  @Column({ type: 'varchar', length: 255 })
  content!: string;

  @Column({ type: 'varchar', length: 7 })
  type!: string;

  @Column({ type: 'bigint', unsigned: true })
  amount!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.histories)
  user!: User;

  @ManyToOne(() => Payment, (payment) => payment.histories, {
    nullable: true,
  })
  payment?: Payment | null;

  @ManyToOne(() => Category, (category) => category.histories, {
    nullable: true,
  })
  category?: Category | null;
}
