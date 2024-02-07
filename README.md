# Book management API

This is a Node.js Express API for managing books and users. It uses MongoDB as the database and includes routes for CRUD operations on books and users.

## Prerequisites

To run this API, you will need the following:

- Node.js and npm installed
- MongoDB
- Personal JWT secret from [jwt.io](https://jwt.io/)

To test it:
- Postman, Insomnia etc (any API testing software you know)

## More about Postman

[Click me!](https://learning.postman.com/docs/introduction/overview/)

## Installation

1. Clone the repository:

```
git clone https://github.com/Meko007/book-management.git
```

2. Install the dependencies:

```
npm install
```

3. Create a `.env` file in the root directory of the project and follow the [sample file](./.env.sample)


## Usage

To start the API, run the following command:

```
npm start
```

The API will be available at `http://localhost:XXXX`.

## Routes

The API goes is accessed through:

- `/api/v1/`: The base endpoint

### Book endpoints

| Operation | Route | Authentication | Admin Privileges | Unique user | Description |
|:----------|:------|:---------------|:-----------------|:------------|:------------|
| POST | /books | Required | Yes | No | Creates a new book |
| GET | /books | Optional | No | No | Returns all books if no query parameters are given |
| PUT | /books/:id | Required | Yes | No | Updates book by its id |
| DELETE | /books/:id | Required | Yes | No | Deletes book by its id |
| POST | /books/:bookId/favourite | Required | No | Yes | Adds a book as a user's favourite |
| DELETE | /books/:bookId/favourite | Required | No | Yes | Deletes book from a user's favourites |
| POST | /books/:bookId/review | Required | No | Yes | User reviews a book
| DELETE | /books/:bookId/review | Required | No | Yes | User deletes review

### User endpoints

| Operation | Route | Authentication | Admin Privileges | Unique user | Description |
|:----------|:------|:---------------|:-----------------|:------------|:------------|
| POST | /users/register | - | No | - | Registers a new user |
| POST | /users/login | - | No | Yes | Logs in user |
| POST | /users/logout | Required | No | Yes | Logs out user |
| GET | /users | Required | Yes | - | Get all users |
| POST | /users/forgot-password | - | No | Yes | User forgets password |
| POST | /users/reset-password | - | No | Yes | User requests to change password |
| GET | /users/viewFavourites | Required | No | Yes | User views their favourite books |
| PUT | /users/:id | Required | Yes | - | Updates a user's suspension and/or admin status |
| DELETE | /users/:id | Required | Yes | - | Deletes a user |
