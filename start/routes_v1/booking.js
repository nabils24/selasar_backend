"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/booking', 'BookingsController.index').middleware('Auth');
    Route_1.default.post('/booking', 'BookingsController.create');
    Route_1.default.get('/booking/get', 'BookingsController.show').middleware('Auth');
    Route_1.default.put('/booking/:id', 'BookingsController.update');
    Route_1.default.delete('/booking/:id', 'BookingsController.destroy').middleware('Auth');
}).prefix('api/v1');
//# sourceMappingURL=booking.js.map