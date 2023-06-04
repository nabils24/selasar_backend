"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/users', 'UsersController.index').middleware('Auth');
    Route_1.default.post('/users', 'UsersController.create');
    Route_1.default.get('/users/:id', 'UsersController.show').middleware('Auth');
    Route_1.default.put('/users/:id', 'UsersController.update');
    Route_1.default.delete('/users/:id', 'UsersController.destroy').middleware('Auth');
}).prefix('api/v1');
//# sourceMappingURL=user.js.map