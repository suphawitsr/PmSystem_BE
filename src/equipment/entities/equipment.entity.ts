import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export enum EquipmentGroup {
  PRINTER = 'PRINTER',
  NETWORK = 'NETWORK',
  COMPUTER = 'COMPUTER',
}

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: EquipmentGroup,
  })
  equipmentGroup: EquipmentGroup;

  @Column()
  type: string;

  @Column()
  serialNumber: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  name: string;

  @Column()
  zoneCode: string;

  @Column({ type: 'date', nullable: true })
  lastPmDate: Date;

  @Column({ type: 'date', nullable: true })
  nextPmDate: Date;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'assignedStaffId' })
  assignedStaff: User;

  @Column({ nullable: true, type: 'uuid' })
  assignedStaffId: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
