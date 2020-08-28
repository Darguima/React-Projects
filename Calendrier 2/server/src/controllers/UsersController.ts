// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
// eslint-disable-next-line no-unused-vars
import { MiddlewareRequest } from '../middlewares/auth'

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

import db from '../database/connection'
import { validationResult } from 'express-validator'

interface UserSchema {
  name: string,
  password: string | undefined,
  birthdayMonth: number,
  birthdayDay: number,
  birthdayYear: number,
  email: string,
}

interface DBUserSchema extends UserSchema {
  userId: number,
}

interface AuthenticationUserParams {
  email: string,
  password: string,
}

interface changeUserDataParams {
  confirmPassword: string | undefined,

  name?: string,
  newPassword?: string | undefined,
  password?: string,
  birthdayMonth?: number,
  birthdayDay?: number,
  birthdayYear?: number,
  email?: string,
}

interface newUserDataSchema extends UserSchema {
  use
}

const generateToken = (id: Number) => {
  return jwt.sign(
    { id },
    authConfig.secret,
    { expiresIn: 86400 }
  )
}

export default class UsersController {
  async register (request: Request, response: Response) {
    try {
      const paramsError = validationResult(request)

      if (!paramsError.isEmpty()) {
        return response.status(400).json({ msg: 'Param error', login: 0, error: paramsError.array() })
      }

      const params: UserSchema = request.body

      params.password = await bcrypt.hash(params.password, 10)

      const data: UserSchema = {
        name: params.name,
        password: params.password,
        birthdayMonth: params.birthdayMonth,
        birthdayDay: params.birthdayDay,
        birthdayYear: params.birthdayYear,
        email: params.email
      }

      const newUserId = await db('users').insert(data)

      const newUser: Array<DBUserSchema> = await db('users')
        .select('*')
        .where('userId', '=', newUserId)

      if (newUser.length > 1) { return response.status(422).json({ msg: 'An unknown error has occurred', login: 0 }) }

      newUser[0].password = undefined

      return response.status(200).json({
        msg: 'Registration complete',
        login: 1,
        user: newUser[0],
        token: generateToken(newUser[0].userId)
      })
    } catch (err) {
      console.warn(err)

      let answer: Response

      err.errno === 19 && err.code === 'SQLITE_CONSTRAINT'
        ? answer = response.status(409).json({ ...err, msg: 'email already in use', login: 0 })
        : answer = response.status(400).json({ ...err, msg: 'An unknown error has occurred', login: 0 })

      return answer
    }
  }

  async authentication (request: Request, response: Response) {
    try {
      const paramsError = validationResult(request)

      if (!paramsError.isEmpty()) {
        return response.status(400).json({ msg: 'Param error', login: 0, error: paramsError.array() })
      }

      const params: AuthenticationUserParams = request.body

      const userData: Array<DBUserSchema> = await db('users')
        .select('*')
        .where('email', '=', params.email)

      if (userData.length < 1) {
        return response.status(422).json({ msg: 'user not found' })
      } else if (userData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      if (!await bcrypt.compare(params.password, userData[0].password)) {
        return response.status(422).json({ msg: 'Incorrect password', login: 0 })
      }

      userData[0].password = undefined

      return response.status(200).json(
        {
          msg: 'Correct password',
          login: 1,
          user: userData[0],
          token: generateToken(userData[0].userId)
        }
      )
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }

  async changeUserData (request: MiddlewareRequest, response: Response) {
    try {
      const paramsError = validationResult(request)

      if (!paramsError.isEmpty()) {
        return response.status(400).json({ msg: 'Param error', error: paramsError.array() })
      }

      const params: changeUserDataParams = request.body

      const userData: Array<DBUserSchema> = await db('users')
        .select('*')
        .where('userId', '=', request.userId)

      if (userData.length < 1) {
        return response.status(422).json({ msg: 'user not found' })
      } else if (userData.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      if (!await bcrypt.compare(params.confirmPassword, userData[0].password)) {
        return response.status(422).json({ msg: 'Incorrect password' })
      }

      params.confirmPassword = undefined
      params.password = await bcrypt.hash(params.newPassword, 10)
      params.newPassword = undefined
      userData[0].userId = undefined
      const newUserData: UserSchema = { ...userData[0], ...params }

      console.log(newUserData)

      await db('users')
        .where('userId', '=', request.userId)
        .update(newUserData)

      newUserData.password = undefined

      return response.status(200).json({ msg: 'Completed changes', user: { ...newUserData, userId: request.userId }, token: generateToken(request.userId) })
    } catch (err) {
      console.warn(err)

      let answer: Response

      err.errno === 19 && err.code === 'SQLITE_CONSTRAINT'
        ? answer = response.status(409).json({ ...err, msg: 'email already in use' })
        : answer = response.status(400).json({ ...err, msg: 'An unknown error has occurred' })

      return answer
    }
  }

  async deleteUserAccount (request: MiddlewareRequest, response: Response) {
    try {
      const paramsError = validationResult(request)

      if (!paramsError.isEmpty()) {
        return response.status(400).json({ msg: 'Param error', error: paramsError.array() })
      }

      const actualPassword: Array<{password: string}> = await db('users')
        .select('password')
        .where('userId', '=', request.userId)

      if (actualPassword.length < 1) {
        return response.status(422).json({ msg: 'user not found' })
      } else if (actualPassword.length > 1) {
        return response.status(422).json({ msg: 'An unknown error has occurred' })
      }

      if (!await bcrypt.compare(request.body.confirmPassword, actualPassword[0].password)) {
        return response.status(422).json({ msg: 'Incorrect password' })
      }

      await db('users')
        .where('userId', '=', request.userId)
        .delete()

      return response.status(200).json({ msg: 'Account Deleted' })
    } catch (err) {
      console.warn(err)
      return response.status(422).json({ ...err, msg: 'An unknown error has occurred' })
    }
  }
}
