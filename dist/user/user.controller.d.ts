import { UserService } from './user.service';
import { UserRole } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    remove(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: any): Promise<{
        id: string;
        name: string;
        username: string;
        role: UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
