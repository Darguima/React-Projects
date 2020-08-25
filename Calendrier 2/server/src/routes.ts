import express from 'express'
import UsersController from './controllers/UsersController'
import EventsController from './controllers/EventsController'

const usersController = new UsersController()
const eventsController = new EventsController()

const routes = express.Router()

routes.get('/users', usersController.index)
routes.post('/users', usersController.create)
routes.put('/users', usersController.edit)
routes.delete('/users', usersController.delete)

routes.get('/events', eventsController.indexAll)

routes.get('/event', eventsController.index)
routes.post('/event', eventsController.create)
routes.put('/event', eventsController.edit)
routes.delete('/event', eventsController.delete)

export default routes
