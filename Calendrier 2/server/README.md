# Calendrier API

## Routes

### UsersController - Routes for managing user accounts

* /register
* /authentication
* /changeUserData
* /deleteUserAccount

Typescript interface:

```
interface CalendrierApiResponse {

  msg: string,
  login: number,

  user?: DBUserSchema,
  token?: string,

  error?: [ {
    value?: string,
    msg: string,
    param: string,
    location: string
  }],

  errno?: number,
  code?: string,
} 

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
```

#### Possible Response

##### express-validator error

HTTP Code - 400

Used in

* /register
* /authentication
* /changeUserData
* /deleteUserAccount

```
const paramsError = validationResult(request)

{
  msg: 'param error',
  login: 0,
  error: paramsError.array()
}
```

##### Database did not return any users

HTTP Code - 422

Used in

* /register
* /authentication
* /changeUserData
* /deleteUserAccount

```
{
  msg: 'db error -> response.length < 1',
  login: 0
}
```

##### Database returned more than one user

HTTP Code - 422

Used in

* /register
* /authentication
* /changeUserData
* /deleteUserAccount

```
{
  msg: 'db error -> response.length > 1',
  login: 0
}
```

##### Email already in use

HTTP Code - 409

Used in

* /register
* /changeUserData

```
{
  "msg": "email already in use",
  "login": 0,
  "errno": 19,
  "code": "SQLITE_CONSTRAINT"
}
```

##### Incorrect Password

HTTP Code - 422

Used in

* /authentication
* /changeUserData
* /deleteUserAccount

```
{
  msg: 'incorrect password',
  login: 0
}
```

##### Unknown error

HTTP Code - 400

Used in

* /register
* /authentication
* /changeUserData
* /deleteUserAccount

```
{
  ...err,
  msg: 'unknown error',
  login: 0
}
```

##### Successful request

HTTP Code - 200

- - -

Used in

* /register
* /authentication
* /changeUserData

```
{
  msg: 'success',
  login: 1,
  user: DBUserSchema,
  token: JWT Token
}
```

- - -

Used in

* /deleteUserAccount

```
{
  msg: 'success',
}
```

- - -

#### Routes Info

##### /register

###### Params

* name - .not().isEmpty({ ignore_whitespace: true }).isString(),
* password - .not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 }),
* birthdayMonth - .isInt({ min: 1, max: 12 }),
* birthdayDay - .isInt({ min: 1, max: 31 }),
* birthdayYear - .isInt({ min: 0 }),
* email - .isEmail()

##### /authentication

###### Params

 * email - .isEmail(),
 * password - .not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 })

##### /changeUserData

###### Params

* Need a JWT token with the userId

* confirmPassword - .not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 }),

* name - .not().isEmpty({ ignore_whitespace: true }).isString().optional(),
* newPassword - .not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 }).optional(),
* birthdayMonth - .isInt({ min: 1, max: 12 }).optional(),
* birthdayDay - .isInt({ min: 1, max: 31 }).optional(),
* birthdayYear - .isInt({ min: 0 }).optional(),
* email - .isEmail().optional()

##### /deleteUserAccount

###### Params

* Need a JWT token with the userId

* confirmPassword - .not().isEmpty({ ignore_whitespace: true }).isString().isLength({ min: 8 })
