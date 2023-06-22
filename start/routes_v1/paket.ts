import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //User
  Route.get('/paket', 'PaketsController.index').middleware('Auth')
  Route.post('/paket', 'PaketsController.create')
  Route.get('/paket/:id', 'PaketsController.show').middleware('Auth')
  Route.get('/paket/jenis/:jenis', 'PaketsController.getByJenis').middleware('Auth')
  Route.put('/paket/:id', 'PaketsController.update')
  Route.delete('/paket/:id', 'PaketsController.destroy').middleware('Auth')
  Route.get('/paket/img/:id', 'PaketsController.img')
}).prefix('api/v1')
