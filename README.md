# Book management API

This is a Node.js `Express` API for managing books and users. It uses MongoDB as the database and includes routes for CRUD operations on books and users.

## Prerequisites

To run this API, you will need the following:

- Node.js and npm installed
- MongoDB

To test it:
- Postman, Insomnia etc (any API testing software you know)

## Postman Documentation

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

3. Create a `.env` file in the root directory of the project and add the following environment variables:

```
PORT=XXXX
MONGODB_URI=mongodb://localhost:27017/bookdb
JWT_SECRET=<your JWT secret gotten from (JWT.io) website>
```

## Usage

To start the API, run the following command:

```
npm run dev
```

The API will be available at `http://localhost:3000`.

## Routes

The API includes the following routes:

- `/api/books`: CRUD operations for books
- `/api/users`: CRUD operations for users

