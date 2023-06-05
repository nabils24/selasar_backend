"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('username').notNullable().unique();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.enum('role', ['admin', 'kasir', 'user']).notNullable();
            table.enum('status_user', ['active', 'inactive']).notNullable();
            table.string('avatar').nullable();
            table.string('phone').nullable();
            table.string('address').nullable();
            table.string('city').nullable();
            table.string('province').nullable();
            table.string('postal_code').nullable();
            table.string('country').nullable();
            table.datetime('created_at', { useTz: true });
            table.dateTime('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1685257563716_users.js.map