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
exports.PmRecordController = void 0;
const common_1 = require("@nestjs/common");
const pm_record_service_1 = require("./pm-record.service");
const create_pm_record_dto_1 = require("./dto/create-pm-record.dto");
const update_pm_record_dto_1 = require("./dto/update-pm-record.dto");
const guards_1 = require("../auth/guards");
const equipment_service_1 = require("../equipment/equipment.service");
const user_entity_1 = require("../user/entities/user.entity");
let PmRecordController = class PmRecordController {
    pmRecordService;
    equipmentService;
    constructor(pmRecordService, equipmentService) {
        this.pmRecordService = pmRecordService;
        this.equipmentService = equipmentService;
    }
    async create(req, createPmRecordDto) {
        createPmRecordDto.staffId = req.user.userId;
        if (req.user.role === user_entity_1.UserRole.STAFF) {
            const equipment = await this.equipmentService.findOne(createPmRecordDto.equipmentId);
            if (equipment.assignedStaffId !== req.user.userId) {
                throw new common_1.ForbiddenException('You can only record PM for equipment assigned to you');
            }
        }
        return this.pmRecordService.create(createPmRecordDto);
    }
    findAll(req) {
        return this.pmRecordService.findAll();
    }
    findOne(id) {
        return this.pmRecordService.findOne(id);
    }
    update(id, updatePmRecordDto) {
        return this.pmRecordService.update(id, updatePmRecordDto);
    }
    remove(id) {
        return this.pmRecordService.remove(id);
    }
};
exports.PmRecordController = PmRecordController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_pm_record_dto_1.CreatePmRecordDto]),
    __metadata("design:returntype", Promise)
], PmRecordController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PmRecordController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PmRecordController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pm_record_dto_1.UpdatePmRecordDto]),
    __metadata("design:returntype", void 0)
], PmRecordController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PmRecordController.prototype, "remove", null);
exports.PmRecordController = PmRecordController = __decorate([
    (0, common_1.UseGuards)(guards_1.JwtAuthGuard, guards_1.RolesGuard),
    (0, common_1.Controller)('api/pm-record'),
    __metadata("design:paramtypes", [pm_record_service_1.PmRecordService,
        equipment_service_1.EquipmentService])
], PmRecordController);
//# sourceMappingURL=pm-record.controller.js.map