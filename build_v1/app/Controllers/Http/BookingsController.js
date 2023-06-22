"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Booking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Booking"));
const DtlBooking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/DtlBooking"));
const random_string_generator_1 = __importDefault(require("random-string-generator"));
const Paket_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Paket"));
class BookingsController {
    async getBooking(value) {
        let booking = await Database_1.default.from('bookings')
            .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
            .innerJoin('users', 'bookings.user_id', 'users.id')
            .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
            .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*');
        const { id, status, date, date1, date2 } = value;
        if (id) {
            booking = await Database_1.default.from('bookings')
                .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
                .innerJoin('users', 'bookings.user_id', 'users.id')
                .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
                .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
                .where('bookings.kode_booking', id);
        }
        else if (status) {
            booking = await Database_1.default.from('bookings')
                .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
                .innerJoin('users', 'bookings.user_id', 'users.id')
                .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
                .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
                .where('bookings.status_booking', status);
        }
        else if (date) {
            booking = await Database_1.default.from('bookings')
                .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
                .innerJoin('users', 'bookings.user_id', 'users.id')
                .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
                .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
                .where('bookings.check_in', date);
        }
        else if (date1 && date2) {
            booking = await Database_1.default.from('bookings')
                .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
                .innerJoin('users', 'bookings.user_id', 'users.id')
                .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
                .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
                .whereBetween('bookings.check_in', [date1, date2]);
        }
        else if (!id && !status && !date && !date1 && !date2) {
            booking = await Database_1.default.from('bookings')
                .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
                .innerJoin('users', 'bookings.user_id', 'users.id')
                .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
                .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*');
        }
        if (booking.length == 0) {
            return {
                status: 'error',
                message: 'data not found / empty',
            };
        }
        else {
            const merged = booking.reduce((acc, cur) => {
                const found = acc.find((el) => el.kode_transaksi === cur.kode_transaksi);
                if (found) {
                    found.dtl_booking.push({
                        paket_id: cur.paket_id,
                        nama_paket: cur.nama_paket,
                        jumlah_kamar: cur.jumlah_kamar,
                        harga: cur.harga,
                        total_harga: cur.total_harga,
                        status_dtl_booking: cur.status_dtl_booking,
                    });
                }
                else {
                    acc.push({
                        id: cur.id,
                        kode_booking: cur.kode_booking,
                        ref: {
                            kode_booking: cur.kode_booking,
                            token: cur.token,
                        },
                        id_user: {
                            user_id: cur.user_id,
                            username: cur.username,
                            email: cur.email,
                            role: cur.role,
                        },
                        check_in: cur.check_in,
                        check_out: cur.check_out,
                        status: {
                            booking: cur.status_booking,
                            pembayaran: cur.status_pembayaran,
                            check_in: cur.status_check_in,
                            check_out: cur.status_check_out,
                        },
                        dtl_booking: [
                            {
                                paket_id: cur.paket_id,
                                nama_paket: cur.nama_paket,
                                dtl_paket: {
                                    id: cur.id_dtl_paket,
                                    nama_paket: cur.nama_paket,
                                    harga: cur.harga,
                                    fasilitas: cur.fasilitas,
                                    deskripsi: cur.deskripsi,
                                    kapasitas: cur.kapasitas,
                                    gambar: cur.gambar,
                                },
                                jumlah_kamar: cur.jumlah_kamar,
                                durasi_menginap: cur.durasi_menginap,
                                harga: cur.harga,
                                total_harga: cur.total_harga,
                                status_dtl_booking: cur.status_dtl_booking,
                            },
                        ],
                    });
                }
                return acc;
            }, []);
            return {
                status: 'success',
                message: 'data found',
                data: merged,
            };
        }
    }
    async index({ response }) {
        let req = {
            id: null,
            status: null,
            date: null,
            date1: null,
            date2: null,
        };
        return await this.getBooking(req);
    }
    async create({ request, response }) {
        function hitungSelisihHari(check_in, check_out) {
            var date1 = new Date(check_in);
            var date2 = new Date(check_out);
            var selisih = Math.abs(date2 - date1);
            var jumlahHari = Math.ceil(selisih / (1000 * 60 * 60 * 24));
            return jumlahHari;
        }
        const booking = new Booking_1.default();
        const dtlBooking = new DtlBooking_1.default();
        const kode_booking = 'BOOK-' + (0, random_string_generator_1.default)('alphanumeric');
        const token = (0, random_string_generator_1.default)('alphanumeric');
        const rawRequest = request.raw();
        const parsedJson = JSON.parse(rawRequest);
        const user_id = parsedJson.user_id;
        const check_in = parsedJson.check_in;
        const check_out = parsedJson.check_out;
        const durasi_menginap = hitungSelisihHari(check_in, check_out);
        const status_booking = 'active';
        const status_pembayaran = 'inactive';
        const status_check_in = 'inactive';
        const status_check_out = 'inactive';
        const dtl_booking = parsedJson.dtl_booking;
        booking.kode_booking = kode_booking;
        booking.token = token;
        booking.user_id = user_id;
        booking.check_in = check_in;
        booking.check_out = check_out;
        booking.durasi_menginap = durasi_menginap;
        dtl_booking.forEach(async (element) => {
            const checkPaket = await Paket_1.default.findBy('id', element.paket_id);
            const paketParsed = JSON.parse(JSON.stringify(checkPaket));
            if (checkPaket == null) {
                return response.badRequest({ message: 'paket tidak ditemukan' });
            }
            else {
                const paket_id = element.paket_id;
                const jumlah_kamar = element.jumlah_kamar;
                const harga = paketParsed.harga;
                const total_harga = harga * jumlah_kamar;
                const status_dtl_booking = 'active';
                booking.total_harga = total_harga;
                booking.status_booking = status_booking;
                booking.status_pembayaran = status_pembayaran;
                booking.status_check_in = status_check_in;
                booking.status_check_out = status_check_out;
                await booking.save();
                dtlBooking.kode_booking = kode_booking;
                dtlBooking.booking_id = booking.id;
                dtlBooking.paket_id = paket_id;
                dtlBooking.jumlah_kamar = jumlah_kamar;
                dtlBooking.harga = harga;
                dtlBooking.total_harga = total_harga;
                dtlBooking.status_dtl_booking = status_dtl_booking;
                await dtlBooking.save();
            }
        });
        let req = {
            id: booking.kode_booking,
            status: null,
            date: null,
            date1: null,
            date2: null,
        };
        return await this.getBooking(req);
    }
    async show({ request, response }) {
        let qs = JSON.parse(JSON.stringify(request.qs()));
        let req = {
            id: qs.id,
            status: qs.status,
            date: qs.date,
            date1: qs.date1,
            date2: qs.date2,
        };
        return this.getBooking(req);
    }
    async update({ request, response }) {
        function hitungSelisihHari(check_in, check_out) {
            var date1 = new Date(check_in);
            var date2 = new Date(check_out);
            var selisih = Math.abs(date2 - date1);
            var jumlahHari = Math.ceil(selisih / (1000 * 60 * 60 * 24));
            return jumlahHari;
        }
        const rawRequest = request.raw();
        const parsedJson = JSON.parse(rawRequest);
        const kode_booking = parsedJson.kode_booking;
        const check_in = parsedJson.check_in;
        const check_out = parsedJson.check_out;
        const durasi_menginap = hitungSelisihHari(check_in, check_out);
        const status_booking = parsedJson.status_booking;
        const status_pembayaran = parsedJson.status_pembayaran;
        const status_check_in = parsedJson.status_check_in;
        const status_check_out = parsedJson.status_check_out;
        const dtl_booking = parsedJson.dtl_booking;
        const booking = await Booking_1.default.findBy('kode_booking', kode_booking);
        booking.check_in = check_in;
        booking.check_out = check_out;
        booking.durasi_menginap = durasi_menginap;
        booking.status_booking = status_booking;
        booking.status_pembayaran = status_pembayaran;
        booking.status_check_in = status_check_in;
        booking.status_check_out = status_check_out;
        dtl_booking.forEach(async (element) => {
            const checkPaket = await Paket_1.default.findBy('id', element.paket_id);
            const paketParsed = JSON.parse(JSON.stringify(checkPaket));
            if (checkPaket == null) {
                return response.badRequest({ message: 'paket tidak ditemukan' });
            }
            else {
                const paket_id = element.paket_id;
                const jumlah_kamar = element.jumlah_kamar;
                const harga = paketParsed.harga;
                const total_harga = harga * jumlah_kamar;
                const status_dtl_booking = 'active';
                booking.total_harga = total_harga;
                await booking.save();
                const dtlBooking = await DtlBooking_1.default.findBy('kode_booking', kode_booking);
                dtlBooking.paket_id = paket_id;
                dtlBooking.jumlah_kamar = jumlah_kamar;
                dtlBooking.harga = harga;
                dtlBooking.total_harga = total_harga;
                dtlBooking.status_dtl_booking = status_dtl_booking;
                await dtlBooking.save();
            }
        });
        let req = {
            id: booking.kode_booking,
            status: null,
            date: null,
            date1: null,
            date2: null,
        };
        return await this.getBooking(req);
    }
    async destroy({ request, response }) {
        const kode_booking = request.params().id;
        const booking = await Booking_1.default.findBy('kode_booking', kode_booking);
        const dtlBooking = await DtlBooking_1.default.findBy('kode_booking', kode_booking);
        await booking?.delete();
        await dtlBooking?.delete();
        return response.ok({ message: 'Data berhasil dihapus' });
    }
}
exports.default = BookingsController;
//# sourceMappingURL=BookingsController.js.map