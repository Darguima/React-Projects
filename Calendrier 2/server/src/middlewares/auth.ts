// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import authConfig from '../config/auth.json'

export interface MiddlewareRequest extends Request {
  userId: number
}

interface Decoded {
  id: number
}

export default function (request: MiddlewareRequest, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) (response.status(401).json({ msg: 'No token provided' }))

  const parts = authHeader.split(' ')

  if (parts.length !== 2) (response.status(401).json({ msg: 'Token error' }))

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) (response.status(401).json({ msg: 'Token malformatted' }))

  jwt.verify(token, authConfig.secret, (err, decoded: Decoded) => {
    if (err) (response.status(401).send({ msg: 'Token invalid' }))

    request.userId = decoded.id

    return next()
  })
}
