import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Equipment } from '../../equipment/entities/equipment.entity';

export enum AlertStatus {
  PENDING = 'PENDING',
  RESOLVED = 'RESOLVED',
}

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Equipment)
  @JoinColumn({ name: 'equipmentId' })
  equipment: Equipment;

  @Column()
  equipmentId: string;

  @Column({ type: 'date' })
  alertDate: Date;

  @Column({
    type: 'enum',
    enum: AlertStatus,
    default: AlertStatus.PENDING,
  })
  status: AlertStatus;

  @CreateDateColumn()
  createdAt: Date;
}
