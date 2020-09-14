# Calendrier API

## Routes

### UsersController - Routes for managing user accounts

* /register
* /authentication
* /changeUserData
* /deleteUserAccount

Typescript interface:

``` 
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

interface UserCalendrierApiResponse {

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

### EventsController - Routes for managing user events

* /indexEvents
* /createEvent
* /editEvent
* /deleteEvent

Typescript interface:

```
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

interface EventCalendrierApiResponse {

  msg: string,

  events?: Array<DBEventSchema>,
  event?: DBEventSchema,

  error?: [ {
    value?: string,
    msg: string,
    param: string,
    location: string
  }],

  errno?: number,
  code?: string,
} 
```

#### Possible Response

##### express-validator error

HTTP Code - 400

Used in

* /createEvent
* /editEvent
* /deleteEvent

```
const paramsError = validationResult(request)

{
  msg: 'param error',
  error: paramsError.array()
}
```

##### Database did not return any event

HTTP Code - 422

Used in

* /editEvent
* /deleteEvent

```
{
  msg: 'db error -> response.length < 1',
}
```

##### Database returned more than one event

HTTP Code - 422

Used in

* /editEvent
* /deleteEvent

```
{
  msg: 'db error -> response.length > 1',
}
```

##### Tried to edit/remove another user's event

HTTP Code - 403

Used in

* /editEvent
* /deleteEvent

```
{
  msg: 'forbidden'
}
```

##### Unknown error

HTTP Code - 400

- - -

Used in

* /editEvent
* /deleteEvent

```
{
  msg: 'An unknown error has occurred - status 0'
}
```

- - -

Used in

* /indexEvents
* /createEvent
* /editEvent
* /deleteEvent

```
{
  ...err,
  msg: 'unknown error',
}
```

- - -

##### Successful request

HTTP Code - 200

- - -

Used in

* /indexEvents

```
{
  msg: 'success',
  events: Array<DBEventSchema>,
}
```

- - -

Used in

* /createEvent
* /editEvent

```
{
  msg: 'success',
  event: DBEventSchema,
}
```

- - -

Used in

* /deleteEvent

```
{
  msg: 'success',
}
```

- - -

#### Routes Info

##### /indexEvents

###### Params

* Need a JWT token with the userId

##### /createEvent

###### Params

* Need a JWT token with the userId

* name - .not().isEmpty({ ignore_whitespace: true }).isString(),
* month - .isInt({ min: 1, max: 12 }),
* day - .isInt({ min: 1, max: 31 }),
* year - .isInt({ min: 0 }),
* hour - .isInt({ min: 0, max: 1439 }),
* description - .isString().optional(),
* completed - .isBoolean(),
* autoComplete - .isBoolean()

##### /editEvent

###### Params

* Need a JWT token with the userId

* eventId - .isInt({ min: 0 }),

* name - .not().isEmpty({ ignore_whitespace: true }).isString().optional(),
* month - .isInt({ min: 1, max: 12 }).optional(),
* day - .isInt({ min: 1, max: 31 }).optional(),
* year - .isInt({ min: 0 }).optional(),
* hour - .isInt({ min: 0, max: 1439 }).optional(),
* description - .isString().optional().optional(),
* completed - .isBoolean().optional(),
* autoComplete - .isBoolean().optional()

##### /deleteEvent

###### Params

* Need a JWT token with the userId

* eventId - .isInt({ min: 0 })
