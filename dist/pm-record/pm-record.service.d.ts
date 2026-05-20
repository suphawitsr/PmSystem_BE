import { Repository } from 'typeorm';
import { CreatePmRecordDto } from './dto/create-pm-record.dto';
import { UpdatePmRecordDto } from './dto/update-pm-record.dto';
import { PmRecord } from './entities/pm-record.entity';
import { EquipmentService } from '../equipment/equipment.service';
export declare class PmRecordService {
    private readonly pmRecordRepository;
    private readonly equipmentService;
    constructor(pmRecordRepository: Repository<PmRecord>, equipmentService: EquipmentService);
    private calculateCost;
    create(createPmRecordDto: CreatePmRecordDto): Promise<PmRecord>;
    findAll(user?: any): Promise<PmRecord[]>;
    findOne(id: string): Promise<PmRecord>;
    update(id: string, updatePmRecordDto: UpdatePmRecordDto): Promise<PmRecord>;
    remove(id: string): Promise<void>;
}
