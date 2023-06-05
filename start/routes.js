"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
require("./routes_v1/user");
require("./routes_v1/paket");
require("./routes_v1/booking");
require("./routes_v1/auth");
Route_1.default.get('/', async () => {
    return { msg: 'Welcome To Rest Api Selasar you must login for accses all routes' };
});
//# sourceMappingURL=routes.js.map