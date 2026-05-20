import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipmentDto } from './create-equipment.dto';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateEquipmentDto extends PartialType(CreateEquipmentDto) {
  @IsOptional()
  @IsDateString()
  nextPmDate?: Date;
}
