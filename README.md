# Developer Quiz API

This API provides four-choice quizzes.
And you can add quizzes.

## Requirements

* node
* npm/yarn
* postgres

## Setup

Initialize node dependencies.

```
yarn install
```

Create developer quiz database.

```
psql -f createdb.sql
```

Create database tables.

```
yarn migrate
```

Insert some data.

```
psql -d developer_quiz -f dataset.sql
```

Launch the server.

```
yarn start
```

## Methods

### GET /api/quizzes/

Get all quizzes.

### POST /api/quizzes/

Add one quiz.

* Data Params

```json
{
  "quiz": "string",
  "correct_answer": "string",
  "wrong_answer1": "string",
  "wrong_answer2": "string",
  "wrong_answer3": "string",
  "authour": "string(OPTIONAL)",
  "password": "string(OPTIONAL)"
}
```

### GET /api/quizzes/random

Get one random quiz.

### GET /api/quizzes/:id

Get particuler quiz.

### DELETE /api/quizzes/:id

Delete particuler quiz.

* Data Params

```json
{
  "authour": "string",
  "password": "string"
}
```

### GET /api/genre/

Get all genre.

### GET /api/users/

Get all users.

### POST /api/users/

Regester as a user.

* Data Params

```json
{
  "username": "string",
  "password": "string"
}
```

### GET /api/users/:username

Regester as a user.

### PUT/PATCH /api/users/:username

Update user information.

* Data Params

```json
{
  "password": "string",
  "newUsername": "string(OPTIONAL)",
  "newPassword": "string(OPTIONAL)"
}
```

### DELETE /api/users/:username

Delete a user.

* Data Params

```json
{
  "password": "string"
}
```

## Contribution

Feel free to send a pull request.

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)
