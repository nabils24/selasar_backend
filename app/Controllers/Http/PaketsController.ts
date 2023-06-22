import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Paket from 'App/Models/Paket'
import Application from '@ioc:Adonis/Core/Application'

export default class PaketsController {
  public async index({ response }: HttpContextContract) {
    const paket = await Paket.all()
    if (!paket) {
      return response.status(404).json({
        message: 'failed',
        data: null,
      })
    } else {
      return response.status(200).json({
        message: 'success',
        data: paket,
      })
    }
  }

  public async getByJenis({ request, response }: HttpContextContract) {
    const jenis = request.param('jenis')
    const paket = await Paket.findBy('jenis', jenis)
    if (!paket) {
      return response.status(404).json({
        message: 'failed',
        data: null,
      })
    }
    return response.status(200).json({
      message: 'success',
      data: paket,
    })
  }

  public async create({ request, response }: HttpContextContract) {
    const avt = request.file('gambar_paket', {
      // ukuran gambar
      size: '2mb',
      // format gambar
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
    })

    if (avt) {
      await avt.move(Application.publicPath('uploads/paket'), {
        name: `paket_${new Date().getTime()}.${avt.extname}`,
        overwrite: true,
      })
    }
    const fileName = avt.fileName

    const paket = new Paket()
    paket.nama_paket = request.input('nama_paket')
    paket.deskripsi = request.input('deskripsi')
    paket.harga = request.input('harga')
    paket.fasilitas = request.input('fasilitas')
    paket.jenis = request.input('jenis')
    paket.jenis_paket = request.input('jenis_paket')
    paket.kapasitas = request.input('kapasitas')
    paket.gambar = fileName
    paket.status_paket = request.input('status_paket')

    await paket.save()
    return response.status(201).json({
      message: 'success',
      data: paket,
    })
  }

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const paket = await Paket.find(id)
    if (paket) {
      return response.status(200).json({
        message: 'success',
        data: paket,
      })
    } else {
      return response.status(404).json({
        message: 'failed',
        data: null,
      })
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const paket = await Paket.find(id)
    if (paket) {
      // upload Avatar
      const avt = request.file('gambar_paket', {
        // ukuran gambar
        size: '2mb',
        // format gambar
        extnames: ['jpg', 'png', 'gif', 'jpeg'],
      })

      if (avt) {
        await avt.move(Application.publicPath('uploads/paket'), {
          name: `paket_${new Date().getTime()}.${avt.extname}`,
          overwrite: true,
        })
      }
      const fileName = avt.fileName

      paket.nama_paket = request.input('nama_paket')
      paket.deskripsi = request.input('deskripsi')
      paket.harga = request.input('harga')
      paket.fasilitas = request.input('fasilitas')
      paket.jenis = request.input('jenis')
      paket.jenis_paket = request.input('jenis_paket')
      paket.kapasitas = request.input('kapasitas')
      paket.gambar = fileName
      paket.status_paket = request.input('status_paket')

      await paket.save()
      return response.status(201).json({
        message: 'success',
        data: paket,
      })
    } else {
      return response.status(404).json({
        message: 'failed',
        data: null,
      })
    }
  }

  public async destroy({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const paket = await Paket.find(id)
    if (paket) {
      await paket.delete()
      return response.status(200).json({
        message: 'success',
        data: null,
      })
    } else {
      return response.status(404).json({
        message: 'failed',
        data: null,
      })
    }
  }
  public async img({ request, response }: HttpContextContract) {
    const paket = await Paket.findBy('id', request.params().id)
    if (paket) {
      return response.download(Application.publicPath('uploads/paket/') + paket.gambar)
    } else {
      return response.status(404).json({ message: 'Image not found' })
    }
  }
}
