import { EquipmentGroup } from '../entities/equipment.entity';
export declare class CreateEquipmentDto {
    equipmentGroup: EquipmentGroup;
    type?: string;
    serialNumber: string;
    brand: string;
    model: string;
    name: string;
    zoneCode: string;
    lastPmDate?: Date;
    assignedStaffId?: string | null;
}
