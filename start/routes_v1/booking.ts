import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //User
  Route.get('/booking', 'BookingsController.index').middleware('Auth')
  Route.post('/booking', 'BookingsController.create')
  Route.get('/booking/get', 'BookingsController.show').middleware('Auth')
  Route.put('/booking', 'BookingsController.update')
  Route.delete('/booking/:id', 'BookingsController.destroy').middleware('Auth')
}).prefix('api/v1')
