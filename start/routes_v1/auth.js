"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
Route_1.default.group(() => {
    Route_1.default.post('/auth/login', async ({ request, auth, response }) => {
        const { email, password } = request.all();
        const user = await User_1.default.findBy('email', email);
        if (!(await Hash_1.default.verify(user.password, password))) {
            return response.unauthorized({ message: 'Password salah' });
        }
        else {
            let datas = {
                logged: true,
                data: await auth.use('api').attempt(email, password, {
                    expiresIn: '30 mins',
                }),
                user: auth.use('api').user,
            };
            auth.use('api').isLoggedIn;
            return datas;
        }
    });
    Route_1.default.post('/auth/logout', async ({ request, auth, response }) => {
        const { email, password } = request.all();
        if (email == null || password == null) {
            return response.unauthorized({ message: 'Email atau Password Tidak Ada' });
        }
        else {
            const user = await User_1.default.findBy('email', email);
            if (!(await Hash_1.default.verify(user.password, password))) {
                return response.unauthorized({ message: 'Password salah' });
            }
            else {
                if (request.header('Authorization') == null) {
                    return response.unauthorized({ message: 'Token Tidak Ada' });
                }
                else {
                    let datas = {
                        logged: false,
                        message: 'Berhasil Logout -' + user.email,
                        data: await auth.use('api').revoke(),
                    };
                    auth.use('api').isLoggedOut;
                    return datas;
                }
            }
        }
    });
    Route_1.default.post('/auth/checkToken', async ({ request, auth, response }) => {
        if (request.header('Authorization') == null) {
            return response.unauthorized({ message: 'Token Tidak Ada' });
        }
        else {
            if (await auth.use('api').check()) {
                return { token: true, message: 'Token Valid' };
            }
            else {
                return {
                    token: false,
                    message: 'Token Tidak Valid/Kadaluarsa',
                };
            }
        }
    });
}).prefix('api/v1');
//# sourceMappingURL=auth.js.map