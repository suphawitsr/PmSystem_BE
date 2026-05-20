import { PmRecordService } from './pm-record.service';
import { CreatePmRecordDto } from './dto/create-pm-record.dto';
import { UpdatePmRecordDto } from './dto/update-pm-record.dto';
import { EquipmentService } from '../equipment/equipment.service';
export declare class PmRecordController {
    private readonly pmRecordService;
    private readonly equipmentService;
    constructor(pmRecordService: PmRecordService, equipmentService: EquipmentService);
    create(req: any, createPmRecordDto: CreatePmRecordDto): Promise<import("./entities/pm-record.entity").PmRecord>;
    findAll(req: any): Promise<import("./entities/pm-record.entity").PmRecord[]>;
    findOne(id: string): Promise<import("./entities/pm-record.entity").PmRecord>;
    update(id: string, updatePmRecordDto: UpdatePmRecordDto): Promise<import("./entities/pm-record.entity").PmRecord>;
    remove(id: string): Promise<void>;
}
