import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UserService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    remove(id: string): Promise<User>;
    update(id: string, updateUserDto: any): Promise<{
        id: string;
        name: string;
        username: string;
        role: import("./entities/user.entity").UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
