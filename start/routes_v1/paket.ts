import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //User
  Route.get('/paket', 'PaketsController.index').middleware('Auth')
  Route.post('/paket', 'PaketsController.create')
  Route.get('/paket/:id', 'PaketsController.show').middleware('Auth')
  Route.put('/paket/:id', 'PaketsController.update')
  Route.delete('/paket/:id', 'PaketsController.destroy').middleware('Auth')
}).prefix('api/v1')
