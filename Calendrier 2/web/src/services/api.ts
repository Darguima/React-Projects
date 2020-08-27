import axios from 'axios'

const calendrierApi = axios.create({
  baseURL: 'http://192.168.1.59:3001'
})

export default calendrierApi

// For tests:

interface Response {
  token: string,
  user: {
    userId: number,
    name: string,
    birthdayMonth: number,
    birthdayDay: number,
    birthdayYear: number
    email: string,
  }
}

export function calendrierApiFake (email: string, password: string): Promise<Response> {
  console.log({ email, password })
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        user: {
          userId: 1,
          name: 'Darguima',
          birthdayMonth: 1,
          birthdayDay: 2,
          birthdayYear: 304,
          email
        }
      })
    }, 1000)
  })
}
