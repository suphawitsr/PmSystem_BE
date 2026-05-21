import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePmRecordDto } from './dto/create-pm-record.dto';
import { UpdatePmRecordDto } from './dto/update-pm-record.dto';
import { PmRecord } from './entities/pm-record.entity';
import { EquipmentService } from '../equipment/equipment.service';
import { EquipmentGroup } from '../equipment/entities/equipment.entity';
import { UserRole } from '../user/entities/user.entity';

@Injectable()
export class PmRecordService {
  constructor(
    @InjectRepository(PmRecord)
    private readonly pmRecordRepository: Repository<PmRecord>,
    private readonly equipmentService: EquipmentService,
  ) {}

  private calculateCost(group: EquipmentGroup): number {
    switch (group) {
      case EquipmentGroup.COMPUTER:
        return 500;
      case EquipmentGroup.PRINTER:
        return 300;
      case EquipmentGroup.NETWORK:
        return 400;
      default:
        return 0;
    }
  }

  async create(createPmRecordDto: CreatePmRecordDto): Promise<PmRecord> {
    const equipment = await this.equipmentService.findOne(createPmRecordDto.equipmentId);
    
    // Automatically determine cost if not provided
    const cost = createPmRecordDto.cost !== undefined 
        ? createPmRecordDto.cost 
        : this.calculateCost(equipment.equipmentGroup);

    const pmRecord = this.pmRecordRepository.create({
      ...createPmRecordDto,
      cost,
    });

    const savedRecord = await this.pmRecordRepository.save(pmRecord);

    // Update equipment's last PM date and next PM date
    await this.equipmentService.updateNextPmDate(equipment.id, createPmRecordDto.pmDate);

    return savedRecord;
  }

  async findAll(user?: any): Promise<PmRecord[]> {
    if (user && user.role === UserRole.STAFF) {
      return this.pmRecordRepository.find({
        where: { staffId: user.userId },
        relations: ['equipment', 'staff'],
        order: { pmDate: 'DESC' },
      });
    }
    return this.pmRecordRepository.find({
      relations: ['equipment', 'staff'],
      order: { pmDate: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PmRecord> {
    const pmRecord = await this.pmRecordRepository.findOne({ 
      where: { id },
      relations: ['equipment', 'staff'],
    });
    if (!pmRecord) {
      throw new NotFoundException(`PM Record with ID ${id} not found`);
    }
    return pmRecord;
  }

  async update(id: string, updatePmRecordDto: UpdatePmRecordDto): Promise<PmRecord> {
    const pmRecord = await this.findOne(id);
    const updated = this.pmRecordRepository.merge(pmRecord, updatePmRecordDto);
    return this.pmRecordRepository.save(updated);
  }

  async remove(id: string): Promise<void> {
    const pmRecord = await this.findOne(id);
    await this.pmRecordRepository.remove(pmRecord);
  }
}
