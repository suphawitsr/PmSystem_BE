"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmRecordModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const pm_record_service_1 = require("./pm-record.service");
const pm_record_controller_1 = require("./pm-record.controller");
const pm_record_entity_1 = require("./entities/pm-record.entity");
const equipment_module_1 = require("../equipment/equipment.module");
let PmRecordModule = class PmRecordModule {
};
exports.PmRecordModule = PmRecordModule;
exports.PmRecordModule = PmRecordModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([pm_record_entity_1.PmRecord]), equipment_module_1.EquipmentModule],
        controllers: [pm_record_controller_1.PmRecordController],
        providers: [pm_record_service_1.PmRecordService],
    })
], PmRecordModule);
//# sourceMappingURL=pm-record.module.js.map