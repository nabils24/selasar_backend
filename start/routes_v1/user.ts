import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  //User
  Route.get('/users', 'UsersController.index').middleware('Auth')
  Route.post('/users', 'UsersController.create')
  Route.get('/users/:id', 'UsersController.show').middleware('Auth')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy').middleware('Auth')
  Route.get('/users/img/:id', 'UsersController.img').middleware('Auth')
}).prefix('api/v1')
