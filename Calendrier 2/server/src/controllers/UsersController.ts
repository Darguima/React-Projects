// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import db from '../database/connection'
import isEmail from '../utils/isEmail'

interface UserSchema {
  userId: number,
  name: string,
  password: string,
  birthdayMonth: number,
  birthdayDay: number,
  birthdayYear: number,
  email: string,
}

export default class UsersController {
  async index (request: Request, response: Response) {
    try {
      const params = request.body

      if (!params.userId) { return response.status(400).json({ msg: 'Some parameter is missing' }) }

      const userData = await db('users').select('*').where('userId', '=', params.userId)

      // Verify if the userId is valid
      if (userData.length < 1) {
        return response.status(422).json({ msg: 'userId invalid' })
      } else if (userData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      return response.status(200).json(userData[0])
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async create (request: Request, response: Response) {
    try {
      const params = request.body

      if (
        !params.name ||
        !params.password ||
        !params.birthdayMonth ||
        !params.birthdayDay ||
        !params.birthdayYear ||
        !params.email
      ) {
        return response.status(422).json({ msg: 'Some parameter is missing' })
      }

      if (
        !(params.birthdayMonth >= 1) || !(params.birthdayMonth <= 12) ||
        !(params.birthdayDay >= 0) || !(params.birthdayDay <= 31) ||
        !(params.birthdayYear >= 0) ||
        !isEmail(params.email)
      ) {
        return response.status(422).json({ msg: 'Some parameter is invalid' })
      }

      const newUserId = await db('users').insert(params)

      const newUser = await db('users').select('*').where('userId', '=', newUserId)

      if (newUser.length > 1) { return response.status(422).json({ msg: 'An unknown error has occurred' }) }

      return response.status(200).json(newUser[0])
    } catch (err) {
      console.warn(err)

      let answer

      err.errno === 19 && err.code === 'SQLITE_CONSTRAINT'
        ? answer = response.status(409).json({ ...err, msg: 'email already in use' })
        : answer = response.status(400).json({ ...err, msg: 'An unknown error has occurred' })

      return answer
    }
  }

  async edit (request: Request, response: Response) {
    try {
      const params: UserSchema = request.body

      if (!params.userId) { return response.status(400).json({ msg: 'Some parameter is missing' }) }

      if (params.name === '') {
        return response.status(422).json({ msg: 'Some parameter is invalid' })
      }

      if (params.password === '') {
        return response.status(422).json({ msg: 'Some parameter is invalid' })
      }

      if (params.birthdayMonth) {
        if (!(params.birthdayMonth >= 1) || !(params.birthdayMonth <= 12)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.birthdayMonth === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.birthdayDay) {
        if (!(params.birthdayDay >= 0) || !(params.birthdayDay <= 31)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.birthdayDay === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.birthdayYear) {
        if (!(params.birthdayYear >= 0)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.birthdayYear === 0) return response.status(422).json({ msg: 'Some parameter is invalid' })

      if (params.email) {
        if (!isEmail(params.email)) {
          return response.status(422).json({ msg: 'Some parameter is invalid' })
        }
      }

      if (params.email === '') return response.status(422).json({ msg: 'Some parameter is invalid' })

      const { userId, ...newDataForUser } = params

      const oldUserData = await db('users')
        .select('name', 'password', 'birthdayMonth', 'birthdayDay', 'birthdayYear', 'email')
        .where('userId', '=', userId)

      // Verify if the userId is valid
      if (oldUserData.length < 1) {
        return response.status(422).json({ msg: 'userId invalid' })
      } else if (oldUserData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      await db('users')
        .where('userId', userId)
        .update({ ...oldUserData[0], ...newDataForUser })

      return response.status(200).json({ userId, ...oldUserData[0], ...newDataForUser })
    } catch (err) {
      console.warn(err)

      let answer

      err.errno === 19 && err.code === 'SQLITE_CONSTRAINT'
        ? answer = response.status(409).json({ ...err, msg: 'email already in use' })
        : answer = response.status(400).json({ ...err, msg: 'An unknown error has occurred' })

      return answer
    }
  }

  async delete (request: Request, response: Response) {
    try {
      const params = request.body

      if (!params.userId) { return response.status(400).json({ msg: 'Some parameter is missing' }) }

      const oldUserData = await db('users')
        .select('*')
        .where('userId', '=', params.userId)

      // Verify if the userId is valid
      if (oldUserData.length < 1) {
        return response.status(422).json({ msg: 'userId invalid' })
      } else if (oldUserData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      await db('users')
        .where('userId', '=', params.userId)
        .del()

      await db('events')
        .where('userId', '=', params.userId)
        .del()

      response.status(201).send()
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }
}
