import { UserRole } from '../../user/entities/user.entity';
export declare class RegisterDto {
    name: string;
    username: string;
    password: string;
    role?: UserRole;
}
