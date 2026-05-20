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
exports.EquipmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipment_entity_1 = require("./entities/equipment.entity");
let EquipmentService = class EquipmentService {
    equipmentRepository;
    constructor(equipmentRepository) {
        this.equipmentRepository = equipmentRepository;
    }
    calculateNextPmDate(lastPmDate, group) {
        const nextDate = new Date(lastPmDate);
        if (group === equipment_entity_1.EquipmentGroup.PRINTER || group === equipment_entity_1.EquipmentGroup.NETWORK) {
            nextDate.setMonth(nextDate.getMonth() + 3);
        }
        else if (group === equipment_entity_1.EquipmentGroup.PC) {
            nextDate.setMonth(nextDate.getMonth() + 6);
        }
        return nextDate;
    }
    async create(createEquipmentDto) {
        const { assignedStaffId, ...rest } = createEquipmentDto;
        const equipment = this.equipmentRepository.create({
            ...rest,
            assignedStaffId: assignedStaffId || null,
        });
        if (equipment.lastPmDate) {
            equipment.nextPmDate = this.calculateNextPmDate(new Date(equipment.lastPmDate), equipment.equipmentGroup);
        }
        else {
            const today = new Date();
            equipment.lastPmDate = today;
            equipment.nextPmDate = this.calculateNextPmDate(today, equipment.equipmentGroup);
        }
        return this.equipmentRepository.save(equipment);
    }
    async findAll(user) {
        return this.equipmentRepository.find({
            relations: ['assignedStaff'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const equipment = await this.equipmentRepository.findOne({ where: { id } });
        if (!equipment) {
            throw new common_1.NotFoundException(`Equipment with ID ${id} not found`);
        }
        return equipment;
    }
    async update(id, updateEquipmentDto) {
        const equipment = await this.findOne(id);
        const { assignedStaffId, ...rest } = updateEquipmentDto;
        this.equipmentRepository.merge(equipment, rest);
        if ('assignedStaffId' in updateEquipmentDto) {
            equipment.assignedStaffId = assignedStaffId || null;
        }
        if (updateEquipmentDto.lastPmDate) {
            equipment.nextPmDate = this.calculateNextPmDate(new Date(equipment.lastPmDate), equipment.equipmentGroup);
        }
        return this.equipmentRepository.save(equipment);
    }
    async remove(id) {
        const equipment = await this.findOne(id);
        await this.equipmentRepository.remove(equipment);
    }
    async updateNextPmDate(id, newLastPmDate) {
        const equipment = await this.findOne(id);
        equipment.lastPmDate = newLastPmDate;
        equipment.nextPmDate = this.calculateNextPmDate(newLastPmDate, equipment.equipmentGroup);
        return this.equipmentRepository.save(equipment);
    }
};
exports.EquipmentService = EquipmentService;
exports.EquipmentService = EquipmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_entity_1.Equipment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EquipmentService);
//# sourceMappingURL=equipment.service.js.map