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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PmRecord = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("../../equipment/entities/equipment.entity");
const user_entity_1 = require("../../user/entities/user.entity");
let PmRecord = class PmRecord {
    id;
    equipment;
    equipmentId;
    staff;
    staffId;
    pmDate;
    cost;
    details;
    createdAt;
};
exports.PmRecord = PmRecord;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PmRecord.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment),
    (0, typeorm_1.JoinColumn)({ name: 'equipmentId' }),
    __metadata("design:type", equipment_entity_1.Equipment)
], PmRecord.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PmRecord.prototype, "equipmentId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'staffId' }),
    __metadata("design:type", user_entity_1.User)
], PmRecord.prototype, "staff", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PmRecord.prototype, "staffId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], PmRecord.prototype, "pmDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], PmRecord.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PmRecord.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PmRecord.prototype, "createdAt", void 0);
exports.PmRecord = PmRecord = __decorate([
    (0, typeorm_1.Entity)()
], PmRecord);
//# sourceMappingURL=pm-record.entity.js.map