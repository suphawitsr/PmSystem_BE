import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment, EquipmentGroup } from './entities/equipment.entity';

@Injectable()
export class EquipmentService {
  constructor(
    @InjectRepository(Equipment)
    private readonly equipmentRepository: Repository<Equipment>,
  ) {}

  calculateNextPmDate(lastPmDate: Date, group: EquipmentGroup): Date {
    const nextDate = new Date(lastPmDate);
    if (group === EquipmentGroup.PRINTER || group === EquipmentGroup.NETWORK) {
      nextDate.setMonth(nextDate.getMonth() + 3);
    } else if (group === EquipmentGroup.PC) {
      nextDate.setMonth(nextDate.getMonth() + 6);
    }
    return nextDate;
  }

  async create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment> {
    // Check for duplicate serial number
    const existing = await this.equipmentRepository.findOne({
      where: { serialNumber: createEquipmentDto.serialNumber },
    });
    if (existing) {
      throw new ConflictException(`Equipment with serial number '${createEquipmentDto.serialNumber}' already exists`);
    }

    const { assignedStaffId, ...rest } = createEquipmentDto;
    const equipment = this.equipmentRepository.create({
      ...rest,
      assignedStaffId: assignedStaffId || null,
    });
    
    if (equipment.lastPmDate) {
      equipment.nextPmDate = this.calculateNextPmDate(new Date(equipment.lastPmDate), equipment.equipmentGroup);
    } else {
      // If no last PM, assume today as the starting point
      const today = new Date();
      equipment.lastPmDate = today;
      equipment.nextPmDate = this.calculateNextPmDate(today, equipment.equipmentGroup);
    }

    return this.equipmentRepository.save(equipment);
  }

  async findAll(user?: any): Promise<Equipment[]> {
    // All users see all equipment; permission to PM is enforced elsewhere
    return this.equipmentRepository.find({
      relations: ['assignedStaff'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Equipment> {
    const equipment = await this.equipmentRepository.findOne({ where: { id } });
    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${id} not found`);
    }
    return equipment;
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment> {
    const equipment = await this.findOne(id);
    const { assignedStaffId, ...rest } = updateEquipmentDto as any;

    // Merge everything except assignedStaffId to avoid TypeORM null-type conflict
    this.equipmentRepository.merge(equipment, rest);

    // Explicitly set assignedStaffId (supports null for unassign)
    if ('assignedStaffId' in updateEquipmentDto) {
      equipment.assignedStaffId = (assignedStaffId as string) || null;
    }

    if (updateEquipmentDto.lastPmDate) {
      equipment.nextPmDate = this.calculateNextPmDate(new Date(equipment.lastPmDate), equipment.equipmentGroup);
    }

    return this.equipmentRepository.save(equipment);
  }

  async remove(id: string): Promise<void> {
    const equipment = await this.findOne(id);
    await this.equipmentRepository.remove(equipment);
  }

  async updateNextPmDate(id: string, newLastPmDate: Date): Promise<Equipment> {
    const equipment = await this.findOne(id);
    equipment.lastPmDate = newLastPmDate;
    equipment.nextPmDate = this.calculateNextPmDate(newLastPmDate, equipment.equipmentGroup);
    return this.equipmentRepository.save(equipment);
  }
}
