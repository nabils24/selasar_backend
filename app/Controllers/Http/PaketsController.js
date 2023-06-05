"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Paket_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Paket"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class PaketsController {
    async index({ response }) {
        const paket = await Paket_1.default.all();
        if (!paket) {
            return response.status(404).json({
                message: 'failed',
                data: null,
            });
        }
        else {
            return response.status(200).json({
                message: 'success',
                data: paket,
            });
        }
    }
    async create({ request, response }) {
        const avt = request.file('gambar_paket', {
            size: '2mb',
            extnames: ['jpg', 'png', 'gif', 'jpeg'],
        });
        if (avt) {
            await avt.move(Application_1.default.publicPath('uploads/paket'), {
                name: `paket_${new Date().getTime()}.${avt.extname}`,
                overwrite: true,
            });
        }
        const fileName = avt.fileName;
        const paket = new Paket_1.default();
        paket.nama_paket = request.input('nama_paket');
        paket.deskripsi = request.input('deskripsi');
        paket.harga = request.input('harga');
        paket.fasilitas = request.input('fasilitas');
        paket.jenis_paket = request.input('jenis_paket');
        paket.kapasitas = request.input('kapasitas');
        paket.gambar = fileName;
        paket.status_paket = request.input('status_paket');
        await paket.save();
        return response.status(201).json({
            message: 'success',
            data: paket,
        });
    }
    async show({ request, response }) {
        const id = request.param('id');
        const paket = await Paket_1.default.find(id);
        if (paket) {
            return response.status(200).json({
                message: 'success',
                data: paket,
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
        const paket = await Paket_1.default.find(id);
        if (paket) {
            const avt = request.file('gambar_paket', {
                size: '2mb',
                extnames: ['jpg', 'png', 'gif', 'jpeg'],
            });
            if (avt) {
                await avt.move(Application_1.default.publicPath('uploads/paket'), {
                    name: `paket_${new Date().getTime()}.${avt.extname}`,
                    overwrite: true,
                });
            }
            const fileName = avt.fileName;
            paket.nama_paket = request.input('nama_paket');
            paket.deskripsi = request.input('deskripsi');
            paket.harga = request.input('harga');
            paket.fasilitas = request.input('fasilitas');
            paket.jenis_paket = request.input('jenis_paket');
            paket.kapasitas = request.input('kapasitas');
            paket.gambar = fileName;
            paket.status_paket = request.input('status_paket');
            await paket.save();
            return response.status(201).json({
                message: 'success',
                data: paket,
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
        const paket = await Paket_1.default.find(id);
        if (paket) {
            await paket.delete();
            return response.status(200).json({
                message: 'success',
                data: null,
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
        const paket = await Paket_1.default.findBy('id', request.params().id);
        if (paket) {
            return response.download(Application_1.default.publicPath('uploads/paket/') + paket.gambar);
        }
        else {
            return response.status(404).json({ message: 'Image not found' });
        }
    }
}
exports.default = PaketsController;
//# sourceMappingURL=PaketsController.js.map