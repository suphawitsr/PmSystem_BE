"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePmRecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pm_record_dto_1 = require("./create-pm-record.dto");
class UpdatePmRecordDto extends (0, mapped_types_1.PartialType)(create_pm_record_dto_1.CreatePmRecordDto) {
}
exports.UpdatePmRecordDto = UpdatePmRecordDto;
//# sourceMappingURL=update-pm-record.dto.js.map