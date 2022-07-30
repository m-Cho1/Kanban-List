require('dotenv/config');
const path = require('path');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const ClientError = require('./client-error');
const authorizationMiddleware = require('./authorization-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  } else if (password.length < 8) {
    throw new ClientError(400, 'password length should be at least 8 characters');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
                    insert into "users" ("username", "hashedPassword")
                    values ($1, $2)
                    returning "userId", "username", "createdAt"
                  `;
      const values = [username, hashedPassword];
      db.query(sql, values)
        .then(result => {
          const [user] = result.rows;
          res.status(201).json(user);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
                select "userId",
                       "hashedPassword"
                from "users"
                where "username" = $1
              `;
  const value = [username];
  db.query(sql, value)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.post('/api/tasks', (req, res, next) => {
  const userId = 1;
  const { title, status, notes } = req.body;
  // console.log('Body data:', req.body);
  const sql = `
              insert into "tasks" ("userId", "title", "status", "notes")
              values ($1, $2, $3, $4)
              returning *
              `;
  const values = [userId, title, status, notes];
  if (values.includes(undefined)) {
    throw new ClientError(401, 'title and status is required field');
  }

  db.query(sql, values)
    .then(result => {
      const newTask = result.rows[0];
      res.json(newTask);
    })
    .catch(err => next(err));

});

app.get('/api/tasks/:userId', (req, res, next) => {
  const userId = Number(req.params.userId);
  if (userId <= 0) {
    throw new ClientError(401, 'userId must be a positive integer');
  }
  const sql = `
               select *
               from "tasks"
               where "userId" = $1
              `;
  const value = [userId];
  db.query(sql, value)
    .then(result => {
      if (!value) {
        throw new ClientError(401, `no matching task with userId ${userId}`);
      }
      const loadData = result.rows;
      res.json({ loadData });
    })
    .catch(error => next(error));
});

app.use(authorizationMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
