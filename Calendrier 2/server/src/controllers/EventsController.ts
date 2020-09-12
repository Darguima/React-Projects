// eslint-disable-next-line no-unused-vars
import { Response } from 'express'
// eslint-disable-next-line no-unused-vars
import { MiddlewareRequest } from '../middlewares/auth'

import db from '../database/connection'

import { validationResult } from 'express-validator'

interface EventSchema {
  name: string,
  month: number,
  day: number,
  year: number,
  hour: number,
  description?: string,
  completed: boolean,
  autoComplete: boolean,
  userId?: number,
}

interface DBEventSchema extends EventSchema {
  eventId: number,
  userId: number,
}

export default class EventsController {
  async index (request: MiddlewareRequest, response: Response) {
    try {
      const events = await db('events')
        .where('userId', '=', request.userId)
        .select('*')
        .orderBy('year')

      return response.status(200).json({
        msg: 'success',
        events
      })
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async create (request: MiddlewareRequest, response: Response) {
    try {
      const paramsError = validationResult(request)

      if (!paramsError.isEmpty()) {
        return response.status(400).json({ msg: 'param error', error: paramsError.array() })
      }

      const newEventData: EventSchema = {
        name: request.body.name,
        month: request.body.month,
        day: request.body.day,
        year: request.body.year,
        hour: request.body.hour,
        description: request.body.description ? request.body.description : '',
        completed: request.body.completed,
        autoComplete: request.body.autoComplete,
        userId: Number(request.userId)
      }

      const eventId = await db('events')
        .insert(newEventData)

      return response.status(200).json({
        msg: 'success',
        event: { ...newEventData, eventId: eventId[0] }
      })
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async edit (request: MiddlewareRequest, response: Response) {
    try {
      const paramsError = validationResult(request)

      if (!paramsError.isEmpty()) {
        return response.status(400).json({ msg: 'param error', error: paramsError.array() })
      }

      const oldEventData: Array<DBEventSchema> = await db('events')
        .select('*')
        .where('eventId', '=', request.body.eventId)

      if (oldEventData.length < 1) {
        return response.status(422).json({ msg: 'db error -> response.length < 1' })
      } else if (oldEventData.length > 1) {
        return response.status(422).json({ msg: 'db error -> response.length > 1' })
      }

      if (oldEventData[0].userId !== request.userId) {
        return response.status(403).json({ msg: 'forbidden' })
      }

      const status = await db('events')
        .where('eventId', '=', request.body.eventId)
        .update(request.body)

      if (status === 1) {
        return response.status(200).json({
          msg: 'success',
          event: { ...oldEventData[0], ...request.body }
        })
      } else {
        return response.status(422).json({ msg: 'An unknown error has occurred - status 0' })
      }
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async delete (request: MiddlewareRequest, response: Response) {
    try {
      const paramsError = validationResult(request)

      if (!paramsError.isEmpty()) {
        return response.status(400).json({ msg: 'param error', error: paramsError.array() })
      }

      const eventOwner: Array<DBEventSchema> = await db('events')
        .select('userId')
        .where('eventId', '=', request.body.eventId)

      if (eventOwner.length < 1) {
        return response.status(422).json({ msg: 'db error -> response.length < 1' })
      } else if (eventOwner.length > 1) {
        return response.status(422).json({ msg: 'db error -> response.length > 1' })
      }

      if (eventOwner[0].userId !== request.userId) {
        return response.status(403).json({ msg: 'forbidden' })
      }

      const status = await db('events')
        .where('eventId', '=', request.body.eventId)
        .delete()

      if (status === 1) {
        return response.status(200).json({
          msg: 'success'
        })
      } else {
        return response.status(422).json({ msg: 'An unknown error has occurred - status 0' })
      }
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }
}
