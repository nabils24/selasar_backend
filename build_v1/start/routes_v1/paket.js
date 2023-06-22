"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.get('/paket', 'PaketsController.index');
    Route_1.default.post('/paket', 'PaketsController.create');
    Route_1.default.get('/paket/:id', 'PaketsController.show');
    Route_1.default.get('/paket/jenis/:jenis', 'PaketsController.getByJenis');
    Route_1.default.put('/paket/:id', 'PaketsController.update');
    Route_1.default.delete('/paket/:id', 'PaketsController.destroy');
    Route_1.default.get('/paket/img/:id', 'PaketsController.img');
}).prefix('api/v1');
//# sourceMappingURL=paket.js.map