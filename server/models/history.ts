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
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  id!: number;

  @Column({ type: 'varchar', length: 31 })
  date!: string;

  @Column({ type: 'varchar', length: 7 })
  paymentType!: string;

  @Column({ type: 'varchar', length: 255 })
  content!: string;

  @Column({ type: 'decimal' })
  amount!: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.histories)
  user!: User;

  @ManyToOne(() => Payment, (payment) => payment.histories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  payment?: Payment | null;

  @ManyToOne(() => Category, (category) => category.histories, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  category?: Category | null;
}
