import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { PmRecordService } from './pm-record.service';
import { CreatePmRecordDto } from './dto/create-pm-record.dto';
import { UpdatePmRecordDto } from './dto/update-pm-record.dto';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { EquipmentService } from '../equipment/equipment.service';
import { UserRole } from '../user/entities/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/pm-record')
export class PmRecordController {
  constructor(
    private readonly pmRecordService: PmRecordService,
    private readonly equipmentService: EquipmentService,
  ) {}

  @Post()
  async create(@Request() req: any, @Body() createPmRecordDto: CreatePmRecordDto) {
    // Always use the authenticated user's ID as the staffId
    createPmRecordDto.staffId = req.user.userId;

    // Staff can only record PM for equipment assigned to them
    if (req.user.role === UserRole.STAFF) {
      const equipment = await this.equipmentService.findOne(createPmRecordDto.equipmentId);
      if (equipment.assignedStaffId !== req.user.userId) {
        throw new ForbiddenException('You can only record PM for equipment assigned to you');
      }
    }

    return this.pmRecordService.create(createPmRecordDto);
  }

  @Get()
  findAll(@Request() req: any) {
    // Admin sees all records; Staff sees all (frontend filters if needed)
    return this.pmRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pmRecordService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePmRecordDto: UpdatePmRecordDto) {
    return this.pmRecordService.update(id, updatePmRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pmRecordService.remove(id);
  }
}
