import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

Route.group(() => {
  //User
  // ini buat login berdasarkan email dan password yang terdaftar
  Route.post('/auth/login', async ({ request, auth, response }: HttpContextContract) => {
    const { email, password } = request.all()

    const user = await User.findBy('email', email)

    //verivy password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized({ message: 'Password salah' })
    } else {
      let datas = {
        logged: true,
        data: await auth.use('api').attempt(email, password, {
          expiresIn: '30 mins',
        }),
        user: auth.use('api').user,
      }
      auth.use('api').isLoggedIn // true
      return datas
    }
  })
  // ini buat logout token
  Route.post('/auth/logout', async ({ request, auth, response }: HttpContextContract) => {
    const { email, password } = request.all()
    let hsh = await Hash.make(password)
    if (email == null || password == null) {
      return response.unauthorized({ message: 'Email atau Password Tidak Ada' })
    } else {
      const user = await User.findBy('email', email)

      if (user?.password != hsh) {
        return response.unauthorized({ message: 'Password salah' })
      } else {
        if (request.header('Authorization') == null) {
          return response.unauthorized({ message: 'Token Tidak Ada' })
        } else {
          let datas = {
            logged: false,
            message: 'Berhasil Logout -' + user.email,
            data: await auth.use('api').revoke(),
          }
          auth.use('api').isLoggedOut // false
          return datas
        }
      }
    }
  })
  // ini buat cek token
  Route.post('/auth/checkToken', async ({ request, auth, response }: HttpContextContract) => {
    if (request.header('Authorization') == null) {
      return response.unauthorized({ message: 'Token Tidak Ada' })
    } else {
      if (await auth.use('api').check()) {
        return { token: true, message: 'Token Valid' }
      } else {
        return {
          token: false,
          message: 'Token Tidak Valid/Kadaluarsa',
        }
      }
    }
  })
}).prefix('api/v1')
