import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const users = await User.all()
    if (users) {
      if (users.length <= 0) {
        return response.status(200).json({
          message: 'success',
          data: 'Data - Users is empty',
        })
      } else {
        return response.status(200).json({
          message: 'success',
          data: users,
        })
      }
    } else {
      return response.status(500).json({
        message: 'failed',
        data: null,
      })
    }
  }

  public async create({ request, response }: HttpContextContract) {
    const user = new User()

    // upload Avatar
    const avt = request.file('avatar', {
      // ukuran gambar
      size: '2mb',
      // format gambar
      extnames: ['jpg', 'png', 'gif', 'jpeg'],
    })

    if (avt) {
      await avt.move(Application.publicPath('uploads/avatars'), {
        name: `avatar_${new Date().getTime()}.${avt.extname}`,
        overwrite: true,
      })
    }
    const fileName = avt.fileName

    user.username = request.input('username')
    user.email = request.input('email')
    user.password = await Hash.make(request.input('password'))
    user.role = request.input('role')
    user.status_user = request.input('status_user')
    user.avatar = fileName
    user.phone = request.input('phone')
    user.address = request.input('address')
    user.city = request.input('city')
    user.province = request.input('province')
    user.postalCode = request.input('postalCode')
    user.country = request.input('country')
    await user.save()
    return response.status(201).json({
      message: 'success',
      data: user,
    })
  }

  public async store({}: HttpContextContract) {}

  public async show({ request, response }: HttpContextContract) {
    const id = request.param('id')
    const user = await User.find(id)
    if (user) {
      return response.status(200).json({
        message: 'success',
        data: user,
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
    const user = await User.find(id)
    if (user) {
      // upload Avatar
      const avt = request.file('avatar', {
        // ukuran gambar
        size: '2mb',
        // format gambar
        extnames: ['jpg', 'png', 'gif', 'jpeg'],
      })

      if (avt) {
        await avt.move(Application.publicPath('uploads/avatars'), {
          name: `avatar_${new Date().getTime()}.${avt.extname}`,
          overwrite: true,
        })
      }
      const fileName = avt.fileName

      user.username = request.input('username')
      user.email = request.input('email')
      user.password = await Hash.make(request.input('password'))
      user.role = request.input('role')
      user.status_user = request.input('status_user')
      user.avatar = fileName
      user.phone = request.input('phone')
      user.address = request.input('address')
      user.city = request.input('city')
      user.province = request.input('province')
      user.postalCode = request.input('postalCode')
      user.country = request.input('country')
      await user.save()
      return response.status(200).json({
        message: 'success',
        data: user,
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
    const user = await User.find(id)
    if (user) {
      await user.delete()
      return response.status(200).json({
        message: 'success',
        data: user,
      })
    } else {
      return response.status(404).json({
        message: 'failed',
        data: null,
      })
    }
  }
}
