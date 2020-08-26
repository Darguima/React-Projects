// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import db from '../database/connection'

interface EventSchema {
  eventId: number,
  name: string,
  month: number,
  day: number,
  year: number,
  hour: number,
  description?: string,
  completed: boolean,
  autoComplete: boolean,
  userId: string,
}

export default class EventsController {
  async indexAll (request: Request, response: Response) {
    try {
      const params = request.body

      if (!paramvs.userId) { return response.status(400).json({ msg: 'Some parameter is missing' }) }

      const userData = await db('users').select('*').where('userId', '=', params.userId)

      // Verify if the userId is valid
      if (userData.length < 1) {
        return response.status(422).json({ msg: 'userId invalid' })
      } else if (userData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      const events = await db('events')
        .select('*')
        .where('userId', '=', params.userId)
        .orderBy('year')

      return response.status(200).json(events)
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async index (request: Request, response: Response) {
    try {
      const params = request.body

      if (!params.userId) { return response.status(400).json({ msg: 'Some parameter is missing' }) }

      if (params.month) {
        if (!(params.month >= 1) || !(params.month <= 12)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.month === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.day) {
        if (!(params.day >= 0) || !(params.day <= 31)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.day === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.year) {
        if (!(params.year >= 0)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.year === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      const userData = await db('users').select('*').where('userId', '=', params.userId)

      // Verify if the userId is valid
      if (userData.length < 1) { return response.status(422).json({ msg: 'userId invalid' }) }

      const events = await db('events')
        .select('*')
        .where('userId', '=', params.userId)
        .orderBy('day')

      const eventsOnTheTimeRange = []

      // Filter the events to return only those in the time range
      for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
        if (Number(params.year)) {
          if (Number(events[eventIndex].year) === Number(params.year)) {
            if (Number(params.month)) {
              if (Number(events[eventIndex].month) === Number(params.month)) {
                if (Number(params.day)) {
                  if (Number(events[eventIndex].day) === Number(params.day)) {
                    eventsOnTheTimeRange.push(events[eventIndex])
                  }
                } else {
                  eventsOnTheTimeRange.push(events[eventIndex])
                }
              }
            } else {
              eventsOnTheTimeRange.push(events[eventIndex])
            }
          }
        } else {
          eventsOnTheTimeRange.push(events[eventIndex])
        }
      }

      return response.status(200).json([...eventsOnTheTimeRange])
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async create (request: Request, response: Response) {
    try {
      const params = request.body

      if (
        !params.userId ||
        !params.name ||
        !params.month ||
        !params.day ||
        !params.year ||
        !params.hour ||
        //! params.description ||
        params.completed === undefined ||
        params.autoComplete === undefined
      ) {
        return response.status(400).json({ msg: 'Some parameter is missing' })
      }

      if (
        !(params.userId >= 1) ||
        !(params.month >= 1) || !(params.month <= 12) ||
        !(params.day >= 0) || !(params.day <= 31) ||
        !(params.year >= 0) ||
        !(params.hour >= 0) || !(params.hour <= 1439) ||
        // eslint-disable-next-line eqeqeq
        ((params.completed != 0) && (params.completed != 1)) ||
        // eslint-disable-next-line eqeqeq
        ((params.autoComplete != 0) && (params.autoComplete != 1))
      ) {
        return response.status(422).json({ msg: 'Some parameter is invalid' })
      }

      const newEventId = await db('events').insert(params)

      const newEvent = await db('events').select('*').where('eventId', '=', newEventId)

      if (newEvent.length > 1) { return response.status(422).json({ msg: 'An unknown error has occurred' }) }

      return response.status(200).json(newEvent[0])
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async edit (request: Request, response: Response) {
    try {
      const params = request.body

      if (!params.eventId) { return response.status(400).json({ msg: 'Some parameter is missing' }) }

      if (params.name === '') {
        return response.status(422).json({ msg: 'Some parameter is invalid' })
      }

      if (params.month) {
        if (!(params.month >= 1) || !(params.month <= 12)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.month === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.day) {
        if (!(params.day >= 0) || !(params.day <= 31)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.day === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.year) {
        if (!(params.year >= 0)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.year === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.hour) {
        if (!(params.hour >= 0) || !(params.hour <= 1439)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.hour === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.completed !== undefined) {
        if ((params.completed != 0) && (params.completed != 1)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.autoComplete !== undefined) {
        if ((params.autoComplete != 0) && (params.autoComplete != 1)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      const { eventId, ...newDataForEvent } = params

      const oldEventData = await db('events')
        .select('name', 'month', 'day', 'year', 'hour', 'description', 'completed', 'autoComplete', 'userId')
        .where('eventId', '=', eventId)

      // Verify if the oldEventData is valid
      if (oldEventData.length < 1) {
        return response.status(422).json({ msg: 'eventId invalid' })
      } else if (oldEventData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      await db('events')
        .where('eventId', '=', eventId)
        .update({ ...oldEventData[0], ...newDataForEvent, userId: oldEventData[0].userId })

      return response.status(200).json({ ...oldEventData[0], ...newDataForEvent, userId: oldEventData[0].userId })
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async delete (request: Request, response: Response) {
    try {
      const params = request.body

      if (!params.eventId) { return response.status(400).json({ msg: 'Some parameter is missing' }) }

      const oldEventData = await db('events')
        .select('*')
        .where('eventId', '=', params.eventId)

      // Verify if the oldEventData is valid
      if (oldEventData.length < 1) {
        return response.status(422).json({ msg: 'eventId invalid' })
      } else if (oldEventData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      await db('events')
        .where('eventId', '=', params.eventId)
        .del()

      response.status(201).send()
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }
}
