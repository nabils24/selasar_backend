import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //User
  Route.get('/paket', 'PaketsController.index')
  Route.post('/paket', 'PaketsController.create')
  Route.get('/paket/:id', 'PaketsController.show')
  Route.get('/paket/jenis/:jenis', 'PaketsController.getByJenis')
  Route.put('/paket/:id', 'PaketsController.update')
  Route.delete('/paket/:id', 'PaketsController.destroy')
  Route.get('/paket/img/:id', 'PaketsController.img')
}).prefix('api/v1')
