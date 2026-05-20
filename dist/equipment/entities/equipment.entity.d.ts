import { User } from '../../user/entities/user.entity';
export declare enum EquipmentGroup {
    PRINTER = "PRINTER",
    NETWORK = "NETWORK",
    PC = "PC"
}
export declare class Equipment {
    id: string;
    equipmentGroup: EquipmentGroup;
    type: string;
    serialNumber: string;
    brand: string;
    model: string;
    name: string;
    zoneCode: string;
    lastPmDate: Date;
    nextPmDate: Date;
    assignedStaff: User;
    assignedStaffId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
