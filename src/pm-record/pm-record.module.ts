import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PmRecordService } from './pm-record.service';
import { PmRecordController } from './pm-record.controller';
import { PmRecord } from './entities/pm-record.entity';
import { EquipmentModule } from '../equipment/equipment.module';

@Module({
  imports: [TypeOrmModule.forFeature([PmRecord]), EquipmentModule],
  controllers: [PmRecordController],
  providers: [PmRecordService],
})
export class PmRecordModule {}
