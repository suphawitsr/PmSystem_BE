import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../user/entities/user.entity';

@Injectable()
export class InitialAdminSeed implements OnModuleInit {
  private readonly logger = new Logger(InitialAdminSeed.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    // Wait for database to be ready
    await this.waitForDatabase();
    await this.seedInitialAdmin();
  }

  private async waitForDatabase(maxRetries = 10): Promise<void> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.dataSource.query('SELECT 1');
        this.logger.log('Database connection ready');
        return;
      } catch (error) {
        this.logger.warn(`Database not ready, retry ${i + 1}/${maxRetries}...`);
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    throw new Error('Database connection failed after max retries');
  }

  private async seedInitialAdmin() {
    try {
      const adminExists = await this.usersRepository.findOne({
        where: { role: UserRole.ADMIN },
      });

      if (!adminExists) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash('admin123', salt);

        const admin = this.usersRepository.create({
          name: 'System Administrator',
          username: 'admin',
          passwordHash,
          role: UserRole.ADMIN,
        });

        await this.usersRepository.save(admin);
        this.logger.log('Initial admin user created: username=admin, password=admin123');
      } else {
        this.logger.log('Admin user already exists');
      }
    } catch (error) {
      this.logger.error('Failed to seed admin:', error.message);
    }
  }
}
