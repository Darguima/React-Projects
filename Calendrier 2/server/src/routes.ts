import express from 'express'
import UsersController from './controllers/UsersController'
import EventsController from './controllers/EventsController'

import authMiddleware from './middlewares/auth'

import { body } from 'express-validator'

const usersController = new UsersController()
const eventsController = new EventsController()

const routes = express.Router()

// No Token needed
routes.post('/register', [
  body('name').not().isEmpty({ ignore_whitespace: true }).isString(),
  body('password').not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 }),
  body('birthdayMonth').isInt({ min: 1, max: 12 }),
  body('birthdayDay').isInt({ min: 1, max: 31 }),
  body('birthdayYear').isInt({ min: 0 }),
  body('email').isEmail()
], usersController.register)

routes.post('/authentication', [
  body('email').isEmail(),
  body('password').not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 })
], usersController.authentication)

// Token needed
routes.use(authMiddleware)

routes.put('/changeUserData', [
  body('confirmPassword').not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 }),

  body('name').not().isEmpty({ ignore_whitespace: true }).isString().optional(),
  body('newPassword').not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 }).optional(),
  body('birthdayMonth').isInt({ min: 1, max: 12 }).optional(),
  body('birthdayDay').isInt({ min: 1, max: 31 }).optional(),
  body('birthdayYear').isInt({ min: 0 }).optional(),
  body('email').isEmail().optional()
], usersController.changeUserData)

routes.delete('/deleteUserAccount', [
  body('confirmPassword').not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 })
], usersController.deleteUserAccount)

routes.get('/events', eventsController.indexAll)

routes.get('/event', eventsController.index)
routes.post('/event', eventsController.create)
routes.put('/event', eventsController.edit)
routes.delete('/event', eventsController.delete)

export default routes
