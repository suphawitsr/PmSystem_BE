import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreatePmRecordDto {
  @IsString()
  @IsNotEmpty()
  equipmentId: string;

  @IsString()
  @IsOptional()
  staffId?: string;

  @IsDateString()
  pmDate: Date;

  @IsNumber()
  @IsOptional()
  cost?: number;

  @IsString()
  @IsOptional()
  details?: string;
}
