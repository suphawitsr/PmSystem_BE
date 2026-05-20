import { Equipment } from '../../equipment/entities/equipment.entity';
export declare enum AlertStatus {
    PENDING = "PENDING",
    RESOLVED = "RESOLVED"
}
export declare class Alert {
    id: string;
    equipment: Equipment;
    equipmentId: string;
    alertDate: Date;
    status: AlertStatus;
    createdAt: Date;
}
