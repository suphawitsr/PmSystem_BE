import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Equipment } from '../../equipment/entities/equipment.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class PmRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipment)
  @JoinColumn({ name: 'equipmentId' })
  equipment: Equipment;

  @Column()
  equipmentId: string;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'staffId' })
  staff: User;

  @Column({ nullable: true })
  staffId: string;

  @Column({ type: 'date' })
  pmDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: number;

  @Column({ type: 'text', nullable: true })
  details: string;

  @CreateDateColumn()
  createdAt: Date;
}
