import { Request, Response } from 'express'

export default class EventsController {
  async indexAll (request: Request, response: Response) {
    return response.json({ user: 'oi' })
  }

  async index (request: Request, response: Response) {
    return response.json({ user: 'oi' })
  }

  async create (request: Request, response: Response) {
    return response.json({ user: 'oi' })
  }

  async edit (request: Request, response: Response) {
    return response.json({ user: 'oi' })
  }

  async delete (request: Request, response: Response) {
    return response.json({ user: 'oi' })
  }
}
