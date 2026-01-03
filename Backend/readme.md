# Users API — Register

## Endpoint
- `POST /users/register`

## Description
Registers a new user. The endpoint validates the input, hashes the password, creates the user record, and returns a JWT authentication token plus the created user (password is not returned).

## Request Headers
- `Content-Type: application/json`

## Request Body (JSON)
- fullname (object)
  - firstname: string — required
  - lastname: string — optional
- email: string — required, must be a valid email
- password: string — required, minimum 6 characters

Example request body:

```json
{
  "fullname": { "firstname": "Jane", "lastname": "Doe" },
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

## Validation Rules
- `fullname.firstname` is required.
- `email` must be a valid email address.
- `password` must be at least 6 characters.

If validation fails, the endpoint responds with status `400 Bad Request` and a JSON payload with an `errors` array from `express-validator`.

## Responses
- `201 Created`
  - Success. Returns JSON with `token` and `user`:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

Note: the password field is not returned in the user object.

- `400 Bad Request`
  - Validation failed. Example:

```json
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" }
  ]
}
```

- `500 Internal Server Error`
  - Unexpected server error.



## Notes
- The endpoint uses `express-validator` for request validation and the user model hashes the password before storing it.
- Ensure `JWT_SECRET` is set in environment variables for token generation.

---

## Login

### Endpoint
- `POST /users/login`

### Description
Authenticates an existing user. The endpoint validates the credentials, compares the provided password with the stored hashed password, and returns a JWT token plus the user object (password is not returned).

### Request Headers
- `Content-Type: application/json`

### Request Body (JSON)
- email: string — required, must be a valid email
- password: string — required, minimum 6 characters

Example request body:

```json
{
  "email": "jane.doe@example.com",
  "password": "secret123"
}
```

### Validation Rules
- `email` must be a valid email address.
- `password` must be at least 6 characters.

If validation fails, the endpoint responds with status `400 Bad Request` and a JSON payload with an `errors` array from `express-validator`.

### Responses
- `200 OK`
  - Success. Returns JSON with `token` and `user`:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<user-id>",
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "socketId": null
  }
}
```

- `400 Bad Request`
  - Validation failed. Example:

```json
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" }
  ]
}
```

- `401 Unauthorized`
  - Invalid credentials. Example:

```json
{
  "message": "Invalid email or password"
}
```

- `500 Internal Server Error`
  - Unexpected server error.


### Notes
- The endpoint uses `express-validator` for request validation and the model stores hashed passwords. The password field is not returned in responses.

---

## Profile

### Endpoint
- `GET /users/profile`

### Description
Returns the currently authenticated user's profile. Requires a valid JWT token (sent as a cookie or in the `Authorization` header as `Bearer <token>`).

### Authentication
- Required: the route is protected by authentication middleware which populates `req.user`.

### Responses
- `200 OK`
  - Success. Returns the authenticated user's object (password will not be present):

```json
{
  "_id": "<user-id>",
  "fullname": { "firstname": "Jane", "lastname": "Doe" },
  "email": "jane.doe@example.com",
  "socketId": null
}
```

- `401 Unauthorized`
  - Missing or invalid token. Example:

```json
{
  "message": "Authentication required"
}
```

---

## Logout

### Endpoint
- `GET /users/logout`

### Description
Logs out the authenticated user by clearing the auth cookie and blacklisting the token so it cannot be used again until it expires. Requires authentication.

### Authentication
- Required: token must be provided (cookie or `Authorization` header).

### Responses
- `200 OK`
  - Success. Example:

```json
{
  "message": "Logged out successfully"
}
```

- `401 Unauthorized`
  - Missing or invalid token. Example:

```json
{
  "message": "Authentication required"
}
```

- `500 Internal Server Error`
  - Unexpected server error during logout or token blacklist creation.

### Notes
- The server stores blacklisted tokens in a collection with a 1-day TTL to prevent reuse for the token lifetime.

---

## Captains

### Register Captain

#### Endpoint
- `POST /captains/register`

#### Description
Registers a new captain. The endpoint validates request data, hashes the password, creates the captain record, and returns a JWT token plus the created `captain` object (password is not returned).

#### Request Headers
- `Content-Type: application/json`

#### Request Body (JSON)
Below is the exact JSON body expected. Inline comments (//) indicate requirements and constraints.

```json
{
  "fullname": {
    "firstname": "John", // required: non-empty string
    "lastname": "Doe" // optional
  },
  "email": "john.doe@example.com", // required: valid email, unique
  "password": "secret123", // required: min 6 characters
  "vehicle": {
    "color": "red", // required
    "plate": "ABC123", // required: unique
    "capacity": 4, // required: integer >= 1
    "vehicleType": "car" // required: one of "car", "bike", "auto"
  }
}
```

> Note: The JSON block above uses inline comments for documentation; real requests must be valid JSON without comments.

#### Responses (JSON)

Success (201 Created):

```json
{
  "message": "Captain registered successfully",
  "captain": {
    "_id": "<captain-id>",
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "vehicle": { "color": "red", "plate": "ABC123", "capacity": 4, "vehicleType": "car" },
    "status": "inactive"
  },
  "token": "<jwt-token>" // JWT token for authenticated requests
}
```

Validation error (400 Bad Request):

```json
{
  "errors": [
    { "msg": "Invalid email", "param": "email", "location": "body" }
  ]
}
```

Conflict / already exists (400 Bad Request):

```json
{
  "message": "Captain with this email already exists" // when email uniqueness fails
}
```

Server error (500 Internal Server Error):

```json
{
  "error": "<error message>"
}
```


#### Notes
- `email` and `vehicle.plate` are unique in the database.
- The server generates a JWT using `JWT_SECRET`; ensure it's set in environment variables.


