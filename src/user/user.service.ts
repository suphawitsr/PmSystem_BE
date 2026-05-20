import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find({
      select: ['id', 'username', 'name', 'role', 'createdAt'],
    });
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.remove(user);
  }

  async update(id: string, updateUserDto: any) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.passwordHash = await bcrypt.hash(updateUserDto.password, salt);
      delete updateUserDto.password;
    }
    
    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);
    const { passwordHash, ...result } = user;
    return result;
  }
}
