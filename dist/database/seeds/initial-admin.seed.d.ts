import { OnModuleInit } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
export declare class InitialAdminSeed implements OnModuleInit {
    private usersRepository;
    private dataSource;
    private readonly logger;
    constructor(usersRepository: Repository<User>, dataSource: DataSource);
    onModuleInit(): Promise<void>;
    private waitForDatabase;
    private seedInitialAdmin;
}
