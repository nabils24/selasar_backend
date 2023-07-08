import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Booking from 'App/Models/Booking'
import DtlBooking from 'App/Models/DtlBooking'
import random from 'random-string-generator'
import Paket from 'App/Models/Paket'
import User from 'App/Models/User'
import { DateTime } from 'luxon'

export default class BookingsController {
  public async getBooking(value) {
    let booking = await Database.from('bookings')
      .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
      .innerJoin('users', 'bookings.user_id', 'users.id')
      .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
      .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')

    // make id, status, date, date1, date2 from value parameter
    const { uid, id, status, date, date1, date2 } = value

    if (id) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
        .where('bookings.kode_booking', id)
    } else if (status) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
        .where('bookings.status_booking', status)
    } else if (date) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
        .where('bookings.check_in', date)
    } else if (uid) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
        .where('bookings.user_id', uid)
    } else if (date1 && date2) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
        .whereBetween('bookings.check_in', [date1, date2])
    } else if (!id && !status && !date && !date1 && !date2) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
    }

    if (booking.length == 0) {
      return {
        status: 'error',
        message: 'data not found / empty',
      }
    } else {
      const merged = booking.reduce((acc: any, cur: any) => {
        const found = acc.find((el: any) => el.kode_transaksi === cur.kode_transaksi)
        if (found) {
          found.dtl_booking.push({
            paket_id: cur.paket_id,
            nama_paket: cur.nama_paket,
            jumlah_kamar: cur.jumlah_kamar,
            harga: cur.harga,
            total_harga: cur.total_harga,
            status_dtl_booking: cur.status_dtl_booking,
          })
        } else {
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
          })
        }
        return acc
      }, [])
      return {
        status: 'success',
        message: 'data found',
        data: merged,
      }
    }
  }
  public async index({ response }: HttpContextContract) {
    let req = {
      id: null,
      status: null,
      date: null,
      date1: null,
      date2: null,
    }
    return await this.getBooking(req)
  }

  public async create({ request, response }: HttpContextContract) {
    // fungsi
    function hitungSelisihHari(check_in, check_out) {
      var date1 = new Date(check_in)
      var date2 = new Date(check_out)

      // Menghitung selisih dalam milidetik dan mengkonversi ke hari
      var selisih = Math.abs(date2 - date1)
      var jumlahHari = Math.ceil(selisih / (1000 * 60 * 60 * 24))

      return jumlahHari
    }

    const booking = new Booking()
    const dtlBooking = new DtlBooking()

    // generate kode booking
    const kode_booking = 'BOOK-' + random('alphanumeric')
    const token = random('alphanumeric')

    // get data from raw request
    const rawRequest = request.raw()
    const parsedJson = JSON.parse(rawRequest)

    // Set Variable
    const user_id = parsedJson.user_id
    const check_in = parsedJson.check_in
    const check_out = parsedJson.check_out
    const durasi_menginap = hitungSelisihHari(check_in, check_out)
    const status_booking = 'active'
    const status_pembayaran = 'inactive'
    const status_check_in = 'inactive'
    const status_check_out = 'inactive'

    // get dtl_booking data
    const dtl_booking = parsedJson.dtl_booking

    // set into booking
    booking.kode_booking = kode_booking
    booking.token = token
    booking.user_id = user_id
    booking.check_in = check_in
    booking.check_out = check_out
    booking.durasi_menginap = durasi_menginap

    // looping for get dtl_booking data
    dtl_booking.forEach(async (element: any) => {
      const checkPaket = await Paket.findBy('id', element.paket_id)
      const checkUser = await User.findBy('id', parsedJson.user_id)
      const paketParsed = JSON.parse(JSON.stringify(checkPaket))
      if (checkUser == null) {
        return response.badRequest({ message: 'user tidak ditemukan' })
      }
      if (checkPaket == null) {
        return response.badRequest({ message: 'paket tidak ditemukan' })
      } else {
        const paket_id = element.paket_id
        const jumlah_kamar = element.jumlah_kamar
        const harga = paketParsed.harga
        const total_harga = harga * jumlah_kamar
        const status_dtl_booking = 'active'

        // set booking to booking
        booking.total_harga = total_harga
        booking.status_booking = status_booking
        booking.status_pembayaran = status_pembayaran
        booking.status_check_in = status_check_in
        booking.status_check_out = status_check_out

        // save booking
        await booking.save()

        // set into dtl_booking
        dtlBooking.kode_booking = kode_booking
        dtlBooking.booking_id = booking.id
        dtlBooking.paket_id = paket_id
        dtlBooking.jumlah_kamar = jumlah_kamar
        dtlBooking.harga = harga
        dtlBooking.total_harga = total_harga
        dtlBooking.status_dtl_booking = status_dtl_booking

        // save dtl_booking
        await dtlBooking.save()
      }
    })
    if (booking.$isPersisted) {
      return response.created({ status: 'success', message: 'booking berhasil dibuat' })
    }
  }

  public async show({ request, response }: HttpContextContract) {
    let qs = JSON.parse(JSON.stringify(request.qs()))
    let req = {
      uid: qs.uid,
      id: qs.id,
      status: qs.status,
      date: qs.date,
      date1: qs.date1,
      date2: qs.date2,
    }
    return this.getBooking(req)
  }

  public async update({ request, response }: HttpContextContract) {
    // fungsi
    function hitungSelisihHari(check_in, check_out) {
      var date1 = new Date(check_in)
      var date2 = new Date(check_out)

      // Menghitung selisih dalam milidetik dan mengkonversi ke hari
      var selisih = Math.abs(date2 - date1)
      var jumlahHari = Math.ceil(selisih / (1000 * 60 * 60 * 24))

      return jumlahHari
    }

    // get data from raw request
    const rawRequest = request.raw()
    const parsedJson = JSON.parse(rawRequest)

    // Set Variable
    const kode_booking = parsedJson.kode_booking
    const check_in = parsedJson.check_in
    const check_out = parsedJson.check_out
    const durasi_menginap = hitungSelisihHari(check_in, check_out)
    const status_booking = parsedJson.status_booking
    const status_pembayaran = parsedJson.status_pembayaran
    const status_check_in = parsedJson.status_check_in
    const status_check_out = parsedJson.status_check_out

    // get dtl_booking data
    const dtl_booking = parsedJson.dtl_booking

    // set into booking
    const booking = await Booking.findBy('kode_booking', kode_booking)
    booking.check_in = check_in
    booking.check_out = check_out
    booking.durasi_menginap = durasi_menginap
    booking.status_booking = status_booking
    booking.status_pembayaran = status_pembayaran
    booking.status_check_in = status_check_in
    booking.status_check_out = status_check_out

    // looping for get dtl_booking data
    dtl_booking.forEach(async (element: any) => {
      const checkPaket = await Paket.findBy('id', element.paket_id)
      const checkUser = await User.findBy('id', parsedJson.user_id)
      const paketParsed = JSON.parse(JSON.stringify(checkPaket))
      if (checkUser == null) {
        return response.badRequest({ message: 'user tidak ditemukan' })
      }
      if (checkPaket == null) {
        return response.badRequest({ message: 'paket tidak ditemukan' })
      } else {
        const paket_id = element.paket_id
        const jumlah_kamar = element.jumlah_kamar
        const harga = paketParsed.harga
        const total_harga = harga * jumlah_kamar
        const status_dtl_booking = 'active'

        // set booking to booking
        booking.total_harga = total_harga

        // save booking
        await booking.save()

        // set into dtl_booking
        const dtlBooking = await DtlBooking.findBy('kode_booking', kode_booking)
        dtlBooking.paket_id = paket_id
        dtlBooking.jumlah_kamar = jumlah_kamar
        dtlBooking.harga = harga
        dtlBooking.total_harga = total_harga
        dtlBooking.status_dtl_booking = status_dtl_booking

        // save dtl_booking
        await dtlBooking.save()
      }
    })
    if (booking.$isPersisted) {
      return response.created({ status: 'success', message: 'booking berhasil diupdate' })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const kode_booking = request.params().id
    const booking = await Booking.findBy('kode_booking', kode_booking)
    const dtlBooking = await DtlBooking.findBy('kode_booking', kode_booking)
    await booking?.delete()
    await dtlBooking?.delete()
    return response.ok({ message: 'Data berhasil dihapus' })
  }
}
