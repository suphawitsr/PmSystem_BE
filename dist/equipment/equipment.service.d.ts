import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment, EquipmentGroup } from './entities/equipment.entity';
export declare class EquipmentService {
    private readonly equipmentRepository;
    constructor(equipmentRepository: Repository<Equipment>);
    calculateNextPmDate(lastPmDate: Date, group: EquipmentGroup): Date;
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(user?: any): Promise<Equipment[]>;
    findOne(id: string): Promise<Equipment>;
    update(id: string, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment>;
    remove(id: string): Promise<void>;
    updateNextPmDate(id: string, newLastPmDate: Date): Promise<Equipment>;
}
