"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UsersController {
    async index({ response }) {
        const users = await User_1.default.all();
        if (users) {
            if (users.length <= 0) {
                return response.status(200).json({
                    message: 'success',
                    data: 'Data - Users is empty',
                });
            }
            else {
                return response.status(200).json({
                    message: 'success',
                    data: users,
                });
            }
        }
        else {
            return response.status(500).json({
                message: 'failed',
                data: null,
            });
        }
    }
    async create({ request, response }) {
        const user = new User_1.default();
        const avt = request.file('avatar', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif', 'jpeg'],
        });
        if (avt) {
            await avt.move(Application_1.default.publicPath('uploads/avatars'), {
                name: `avatar_${new Date().getTime()}.${avt.extname}`,
                overwrite: true,
            });
            user.avatar = avt.fileName;
        }
        else {
            user.avatar = 'default.png';
        }
        user.username = request.input('username');
        user.email = request.input('email');
        user.password = await Hash_1.default.make(request.input('password'));
        user.role = request.input('role');
        user.status_user = request.input('status_user');
        user.phone = request.input('phone');
        user.address = request.input('address');
        user.city = request.input('city');
        user.province = request.input('province');
        user.postalCode = request.input('postalCode');
        user.country = request.input('country');
        await user.save();
        return response.status(201).json({
            message: 'success',
            data: user,
        });
    }
    async store({}) { }
    async show({ request, response }) {
        const id = request.param('id');
        const user = await User_1.default.find(id);
        if (user) {
            return response.status(200).json({
                message: 'success',
                data: user,
            });
        }
        else {
            return response.status(404).json({
                message: 'failed',
                data: null,
            });
        }
    }
    async update({ request, response }) {
        const id = request.param('id');
        const user = await User_1.default.find(id);
        if (user) {
            const avt = request.file('avatar', {
                size: '2mb',
                extnames: ['jpg', 'png', 'gif', 'jpeg'],
            });
            if (avt) {
                await avt.move(Application_1.default.publicPath('uploads/avatars'), {
                    name: `avatar_${new Date().getTime()}.${avt.extname}`,
                    overwrite: true,
                });
            }
            const fileName = avt.fileName;
            user.username = request.input('username');
            user.email = request.input('email');
            user.password = await Hash_1.default.make(request.input('password'));
            user.role = request.input('role');
            user.status_user = request.input('status_user');
            user.avatar = fileName;
            user.phone = request.input('phone');
            user.address = request.input('address');
            user.city = request.input('city');
            user.province = request.input('province');
            user.postalCode = request.input('postalCode');
            user.country = request.input('country');
            await user.save();
            return response.status(200).json({
                message: 'success',
                data: user,
            });
        }
        else {
            return response.status(404).json({
                message: 'failed',
                data: null,
            });
        }
    }
    async destroy({ request, response }) {
        const id = request.param('id');
        const user = await User_1.default.find(id);
        if (user) {
            await user.delete();
            return response.status(200).json({
                message: 'success',
                data: user,
            });
        }
        else {
            return response.status(404).json({
                message: 'failed',
                data: null,
            });
        }
    }
    async img({ request, response }) {
        const user = await User_1.default.findBy('id', request.params().id);
        if (user) {
            return response.download(Application_1.default.publicPath('uploads/avatars/') + user.avatar);
        }
        else {
            return response.status(404).json({ message: 'Image not found' });
        }
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map