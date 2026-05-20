import { PartialType } from '@nestjs/mapped-types';
import { CreatePmRecordDto } from './create-pm-record.dto';

export class UpdatePmRecordDto extends PartialType(CreatePmRecordDto) {}
