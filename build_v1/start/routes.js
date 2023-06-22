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
    let status = {
        status: 'success',
        uptime: Math.floor(process.uptime() / 86400) +
            'd ' +
            Math.floor(process.uptime() / 3600) +
            'h ' +
            Math.floor((process.uptime() % 3600) / 60) +
            'm ' +
            Math.floor(process.uptime() % 60) +
            's',
        information: {
            node_version: process.version,
            platform: process.platform,
            arch: process.arch,
            cpu_usage: process.cpuUsage(),
            total_memory: process.memoryUsage().heapTotal,
            free_memory: process.memoryUsage().heapUsed,
            process_memory: process.memoryUsage().rss,
        },
        message: 'Welcome To Rest Api Selasar you must login for accses all routes',
    };
    return status;
});
//# sourceMappingURL=routes.js.map