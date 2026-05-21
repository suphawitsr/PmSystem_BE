import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../user/entities/user.entity';
export declare class InitialAdminSeed implements OnModuleInit {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    private seedInitialAdmin;
}
