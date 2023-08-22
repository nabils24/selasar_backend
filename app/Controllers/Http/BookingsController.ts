import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Booking from 'App/Models/Booking'
import DtlBooking from 'App/Models/DtlBooking'
import random from 'random-string-generator'
import Paket from 'App/Models/Paket'
import User from 'App/Models/User'
import midtransClient from 'midtrans-client'
import { DateTime } from 'luxon'
import hash from 'js-sha512'
import axios from 'axios'
export default class BookingsController {
  public async getBooking(value) {
    let booking = await Database.from('bookings')
      .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
      .innerJoin('users', 'bookings.user_id', 'users.id')
      .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
      .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')

    // make id, status, date, date1, date2 from value parameter
    const { uid, id, stat, status, date, date1, date2 } = value

    console.log(value)
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
    } else if (uid && stat) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
        .where('bookings.user_id', uid) // user id
        .where('bookings.status_booking', stat) // status booking
      console.log('uid & stat')
    } else if (date1 && date2) {
      booking = await Database.from('bookings')
        .innerJoin('dtl_bookings', 'bookings.id', 'dtl_bookings.booking_id')
        .innerJoin('users', 'bookings.user_id', 'users.id')
        .innerJoin('pakets', 'dtl_bookings.paket_id', 'pakets.id')
        .select('bookings.*', 'users.*', 'dtl_bookings.*', 'pakets.*')
        .whereBetween('bookings.check_in', [date1, date2])
    } else if (!id && !stat && !date && !date1 && !date2 && !uid && !status) {
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
      const merged = booking.reduce((acc, cur) => {
        const existingBooking = acc.find((el) => el.kode_booking === cur.kode_booking)
        if (existingBooking) {
          existingBooking.dtl_booking.push({
            paket_id: cur.paket_id,
            nama_paket: cur.nama_paket,
            jumlah_kamar: cur.jumlah_kamar,
            harga: cur.harga,
            total_harga: cur.total_harga,
            status_dtl_booking: cur.status_dtl_booking,
          })
        } else {
          const newBooking = {
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
          }
          acc.push(newBooking)
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
      uid: null,
      id: null,
      stat: null,
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
    if (booking) {
      return {
        status: 'success',
        message: 'data saved',
        data: booking,
      }
    }
  }

  public async show({ request, response }: HttpContextContract) {
    let qs = JSON.parse(JSON.stringify(request.qs()))
    let req = {
      uid: qs.uid,
      id: qs.id,
      stat: qs.stat,
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
    if (booking) {
      return {
        status: 'success',
        message: 'data saved',
        data: booking,
      }
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

  public async getMidtrans({ request, response }: HttpContextContract) {
    // get data from raw request
    const rawRequest = request.raw()
    const parsedJson = JSON.parse(rawRequest)

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      //change when production
      serverKey: 'SB-Mid-server-UhPxg10BYDN2VawUAibflVwk',
      clientKey: '	SB-Mid-client-cNrdDzqDmMCyoitJ',
    })

    await snap
      .createTransaction(parsedJson)
      .then((transaction) => {
        // transaction token
        return response.ok({ status: 'success', result: transaction })
      })
      .catch((error) => {
        return response.badRequest({ status: 'error', result: error })
      })

    // axios({
    //   // Below is the API URL endpoint
    //   url: "https://app.sandbox.midtrans.com/snap/v1/transactions",
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //     Authorization:
    //       "Basic " +
    //       Buffer.from("SB-Mid-server-GwUP_WGbJPXsDzsNEBRs8IYA").toString("base64")
    //     // Above is API server key for the Midtrans account, encoded to base64
    //   },
    //   data:
    //     // Below is the HTTP request body in JSON
    //     {
    //       transaction_details: {
    //         order_id: "order-csb-" + getCurrentTimestamp(),
    //         gross_amount: 10000
    //       },
    //       credit_card: {
    //         secure: true
    //       },
    //       customer_details: {
    //         first_name: "Johny",
    //         last_name: "Kane",
    //         email: "testmidtrans@mailnesia.com",
    //         phone: "08111222333"
    //       }
    //     }
    // }).then( snapResponse => {
    //   // Success, snapResponse contains response from API server
    //   console.log("transaction token = " + snapResponse.data.token);
    //   return response.ok({ status: 'success', result: snapResponse.data.token })
    // }).catch( error => {
    //   // Error, check `error` for more details
    //   console.log("error = " + error);

    //   })
  }
  public async callbackmidtrans({ request, response }: HttpContextContract) {
    let serverkey = 'SB-Mid-server-UhPxg10BYDN2VawUAibflVwk'
    // get data from raw request
    const rawRequest = request.raw()
    const parsedJson = JSON.parse(rawRequest)

    let payload = parsedJson.order_id + parsedJson.status_code + parsedJson.gross_amount + serverkey
    // hash payload to SHA512
    let signatureKey = hash.sha512(payload)
    if (signatureKey == parsedJson.signature_key) {
      if (parsedJson.transaction_status == 'capture') {
        const booking = await Booking.findBy('kode_booking', parsedJson.order_id)
        booking.status_pembayaran = 'capture'
        booking.res_midtrans = JSON.stringify(rawRequest)
        await booking?.save()
        return response.ok({ status: 'success', result: parsedJson })
      } else if (parsedJson.transaction_status == 'settlement') {
        const booking = await Booking.findBy('kode_booking', parsedJson.order_id)
        booking.status_pembayaran = 'settlement'
        booking.res_midtrans = JSON.stringify(rawRequest)
        await booking?.save()
        return response.ok({ status: 'success', result: parsedJson })
      } else if (parsedJson.transaction_status == 'pending') {
        const booking = await Booking.findBy('kode_booking', parsedJson.order_id)
        booking.status_pembayaran = 'pending'
        booking.res_midtrans = JSON.stringify(rawRequest)
        await booking?.save()
        return response.ok({ status: 'success', result: parsedJson })
      } else if (parsedJson.transaction_status == 'deny') {
        const booking = await Booking.findBy('kode_booking', parsedJson.order_id)
        booking.status_pembayaran = 'deny'
        booking.res_midtrans = JSON.stringify(rawRequest)
        await booking?.save()
        return response.ok({ status: 'success', result: parsedJson })
      } else if (parsedJson.transaction_status == 'expire') {
        const booking = await Booking.findBy('kode_booking', parsedJson.order_id)
        booking.status_pembayaran = 'expire'
        booking.res_midtrans = JSON.stringify(rawRequest)
        await booking?.save()
        return response.ok({ status: 'success', result: parsedJson })
      } else {
        return response.badRequest({ status: 'error', result: parsedJson })
      }
    } else {
      return response.badRequest({ status: 'error | signature-key not same', result: parsedJson })
    }
  }
}
