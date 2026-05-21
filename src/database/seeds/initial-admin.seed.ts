import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../user/entities/user.entity';

@Injectable()
export class InitialAdminSeed implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.seedInitialAdmin();
  }

  private async seedInitialAdmin() {
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
      console.log('Initial admin user created: username=admin, password=admin123');
    }
  }
}
