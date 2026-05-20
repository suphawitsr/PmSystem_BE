"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmRecordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const pm_record_entity_1 = require("./entities/pm-record.entity");
const equipment_service_1 = require("../equipment/equipment.service");
const equipment_entity_1 = require("../equipment/entities/equipment.entity");
const user_entity_1 = require("../user/entities/user.entity");
let PmRecordService = class PmRecordService {
    pmRecordRepository;
    equipmentService;
    constructor(pmRecordRepository, equipmentService) {
        this.pmRecordRepository = pmRecordRepository;
        this.equipmentService = equipmentService;
    }
    calculateCost(group) {
        switch (group) {
            case equipment_entity_1.EquipmentGroup.PC:
                return 500;
            case equipment_entity_1.EquipmentGroup.PRINTER:
                return 300;
            case equipment_entity_1.EquipmentGroup.NETWORK:
                return 400;
            default:
                return 0;
        }
    }
    async create(createPmRecordDto) {
        const equipment = await this.equipmentService.findOne(createPmRecordDto.equipmentId);
        const cost = createPmRecordDto.cost !== undefined
            ? createPmRecordDto.cost
            : this.calculateCost(equipment.equipmentGroup);
        const pmRecord = this.pmRecordRepository.create({
            ...createPmRecordDto,
            cost,
        });
        const savedRecord = await this.pmRecordRepository.save(pmRecord);
        await this.equipmentService.updateNextPmDate(equipment.id, createPmRecordDto.pmDate);
        return savedRecord;
    }
    async findAll(user) {
        if (user && user.role === user_entity_1.UserRole.STAFF) {
            return this.pmRecordRepository.find({
                where: { staffId: user.userId },
                relations: ['equipment', 'staff'],
                order: { pmDate: 'DESC' },
            });
        }
        return this.pmRecordRepository.find({
            relations: ['equipment', 'staff'],
            order: { pmDate: 'DESC' },
        });
    }
    async findOne(id) {
        const pmRecord = await this.pmRecordRepository.findOne({
            where: { id },
            relations: ['equipment', 'staff'],
        });
        if (!pmRecord) {
            throw new common_1.NotFoundException(`PM Record with ID ${id} not found`);
        }
        return pmRecord;
    }
    async update(id, updatePmRecordDto) {
        const pmRecord = await this.findOne(id);
        const updated = this.pmRecordRepository.merge(pmRecord, updatePmRecordDto);
        return this.pmRecordRepository.save(updated);
    }
    async remove(id) {
        const pmRecord = await this.findOne(id);
        await this.pmRecordRepository.remove(pmRecord);
    }
};
exports.PmRecordService = PmRecordService;
exports.PmRecordService = PmRecordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(pm_record_entity_1.PmRecord)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        equipment_service_1.EquipmentService])
], PmRecordService);
//# sourceMappingURL=pm-record.service.js.map