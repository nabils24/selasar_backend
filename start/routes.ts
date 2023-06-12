/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import './routes_v1/user'
import './routes_v1/paket'
import './routes_v1/booking'
import './routes_v1/auth'

Route.get('/', async () => {
  let status = {
    status: 'success',
    // format process uptime to number day hour minute second
    uptime:
      Math.floor(process.uptime() / 86400) +
      'd ' +
      Math.floor(process.uptime() / 3600) +
      'h ' +
      Math.floor((process.uptime() % 3600) / 60) +
      'm ' +
      Math.floor(process.uptime() % 60) +
      's',
    information: {
      node_version: process.version,
      platform: process.platform,
      arch: process.arch,
      cpu_usage: process.cpuUsage(),
      total_memory: process.memoryUsage().heapTotal,
      free_memory: process.memoryUsage().heapUsed,
      process_memory: process.memoryUsage().rss,
    },
    // endpoint_v1: {
    //   user: {
    //     login: '/api/v1/user/login',
    //     register: '/api/v1/user/register',
    //     update: '/api/v1/user/update',
    //     delete: '/api/v1/user/delete',
    //     get: '/api/v1/user/get',
    //   },
    //   paket: {
    //     create: '/api/v1/paket/create',
    //     update: '/api/v1/paket/update',
    //     delete: '/api/v1/paket/delete',
    //     get: '/api/v1/paket/get',
    //   },
    //   booking: {
    //     create: '/api/v1/booking/create',
    //     update: '/api/v1/booking/update',
    //     delete: '/api/v1/booking/delete',
    //     get: '/api/v1/booking/get',
    //   },
    //   auth: {
    //     login: '/api/v1/auth/login',
    //     register: '/api/v1/auth/register',
    //   },
    // },

    message: 'Welcome To Rest Api Selasar you must login for accses all routes',
  }
  return status
})
