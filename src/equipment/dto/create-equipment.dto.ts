import { IsEnum, IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';
import { EquipmentGroup } from '../entities/equipment.entity';

export class CreateEquipmentDto {
  @IsEnum(EquipmentGroup)
  equipmentGroup: EquipmentGroup;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  zoneCode: string;

  @IsOptional()
  @IsString()
  textLog?: string | null;

  @IsOptional()
  @IsDateString()
  lastPmDate?: Date;

  @IsOptional()
  @IsString()
  assignedStaffId?: string | null;
}
