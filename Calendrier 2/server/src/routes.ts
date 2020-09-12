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

routes.get('/indexEvents', eventsController.index)
routes.post('/createEvent', [
  body('name').not().isEmpty({ ignore_whitespace: true }).isString(),
  body('month').isInt({ min: 1, max: 12 }),
  body('day').isInt({ min: 1, max: 31 }),
  body('year').isInt({ min: 0 }),
  body('hour').isInt({ min: 0, max: 1439 }),
  body('description').isString().optional(),
  body('completed').isBoolean(),
  body('autoComplete').isBoolean()
], eventsController.create)
routes.put('/editEvent', [
  body('eventId').isInt({ min: 0 }),

  body('name').not().isEmpty({ ignore_whitespace: true }).isString().optional(),
  body('month').isInt({ min: 1, max: 12 }).optional(),
  body('day').isInt({ min: 1, max: 31 }).optional(),
  body('year').isInt({ min: 0 }).optional(),
  body('hour').isInt({ min: 0, max: 1439 }).optional(),
  body('description').isString().optional().optional(),
  body('completed').isBoolean().optional(),
  body('autoComplete').isBoolean().optional()
], eventsController.edit)
routes.delete('/deleteEvent', [
  body('eventId').isInt({ min: 0 })
], eventsController.delete)

export default routes
