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
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
class Booking extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Booking.prototype, "kode_booking", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Booking.prototype, "token", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Booking.prototype, "user_id", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "check_in", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "check_out", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Booking.prototype, "durasi_menginap", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Booking.prototype, "total_harga", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Booking.prototype, "status_booking", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Booking.prototype, "status_pembayaran", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Booking.prototype, "status_check_in", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Booking.prototype, "status_check_out", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "updatedAt", void 0);
exports.default = Booking;
//# sourceMappingURL=Booking.js.map