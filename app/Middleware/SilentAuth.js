"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SilentAuthMiddleware {
    async handle({ auth, response }, next) {
        await auth.use('api').check();
        if (auth.use('api').isLoggedIn) {
            await next();
        }
        else {
            return response.status(401).json({
                logged: false,
                message: 'Unauthorized, There is no token in Authorization',
            });
        }
    }
}
exports.default = SilentAuthMiddleware;
//# sourceMappingURL=SilentAuth.js.map