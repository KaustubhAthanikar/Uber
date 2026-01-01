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

## Example curl

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Jane","lastname":"Doe"},"email":"jane.doe@example.com","password":"secret123"}'
```

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

### Example curl

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane.doe@example.com","password":"secret123"}'
```

### Notes
- The endpoint uses `express-validator` for request validation and the model stores hashed passwords. The password field is not returned in responses.

