"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/paket', 'PaketsController.index').middleware('Auth');
    Route_1.default.post('/paket', 'PaketsController.create');
    Route_1.default.get('/paket/:id', 'PaketsController.show').middleware('Auth');
    Route_1.default.put('/paket/:id', 'PaketsController.update');
    Route_1.default.delete('/paket/:id', 'PaketsController.destroy').middleware('Auth');
    Route_1.default.get('/paket/img/:id', 'PaketsController.img').middleware('Auth');
}).prefix('api/v1');
//# sourceMappingURL=paket.js.map