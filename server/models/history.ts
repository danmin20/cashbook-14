import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Payment } from './payment';
import { User } from './user';

@Entity('history')
export class History {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id!: string;

  @Column({ type: 'varchar' })
  date!: string;

  @Column({ type: 'varchar' })
  category!: string;

  @Column({ type: 'varchar' })
  content!: string;

  @Column({ type: 'varchar' })
  type!: string;

  @Column({ type: 'bigint' })
  amount!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.histories)
  user!: User;

  @ManyToOne(() => Payment, (payment) => payment.histories)
  payment!: Payment;
}
