import { Equipment } from '../../equipment/entities/equipment.entity';
import { User } from '../../user/entities/user.entity';
export declare class PmRecord {
    id: string;
    equipment: Equipment;
    equipmentId: string;
    staff: User;
    staffId: string;
    pmDate: Date;
    cost: number;
    details: string;
    createdAt: Date;
}
