// Import global settings from .env
import {} from 'dotenv/config';

// Debugging, set verbosity in .env
import debug from 'debug';
const log = {
  app: debug('app:config'),
  db: debug('app:db'),
};

// Packages
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import RedisStorePackage from 'connect-redis';
import session from 'express-session';
log.app('Packages loaded.');

// Routes
import * as routes from './routes';

// Create the express instance and load all imported packages.
const app = express();

app.set('trust proxy', 1);
app.use(
  session({
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: null,
    },
    resave: true,
    saveUninitialized: false,
    secret: process.env.SECRET,
    store: redisStore,
  })
);
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
log.app('Packages enabled.');

// Configure database and redis-connect middleware, connecting to DB.
let dbConnections = 0;

const RedisStore = RedisStorePackage(session);
const redisSessionStoreOptions = {
  host: process.env.DB_REDIS_HOST || '127.0.0.1',
  password: process.env.DB_REDIS_PASSWORD,
  port: process.env.DB_REDIS_PORT || '6379',
  retry_strategy(options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('REDIS: The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      return new Error('REDIS: Retry time exhausted');
    }
    if (options.attempt > 10) {
      return undefined;
    }
    return Math.min(options.attempt * 100, 3000);
  },
};
const redisStore = new RedisStore(redisSessionStoreOptions);
redisStore.client
  .on('connect', () => {
    log.db('REDIS: Connecting to db...');
  })
  .on('ready', () => {
    log.db('REDIS: Successfully connected to db!');
    dbConnections += 1;
    if (dbConnections == 2) {
      app.emit('db-connected');
    }
  })
  .on('error', err => {
    log.db('REDIS: Could not connect to db!', err);
  });

// Connect to mongodb to hold user credentials.
const dbUrl =
  'mongodb://' +
  process.env.DB_MONGO_URL +
  ':' +
  process.env.DB_MONGO_PORT +
  '/' +
  process.env.DB_MONGO_NAME;
mongoose
  .connect(dbUrl, { useNewUrlParser: true }, () => {
    log.db('MONGODB: Connecting to db...');
  })
  .then(() => {
    log.db('MONGODB: Successfully connected to db!');
    dbConnections += 1;
    if (dbConnections == 2) {
      app.emit('db-connected');
    }
  })
  .catch(err => {
    log.db('MONGODB: Could not connect to db!', err);
  });

// When DB is connected, load routes and setup 404.
app.on('db-connected', () => {
  for (const key in routes) {
    app.use('', routes[key]);
  }

  app.use((req, res) => {
    res.status(404).send('<h1>404 - Not found</h1>');
  });

  log.app('Routes added.');

  app.emit('ready');
});

// Start the server when DB is running and routes are loaded.
const httpServer = http.Server(app);
app.on('ready', () => {
  log.app('Starting server...');

  const port = process.env.PORT || 3000;
  const server = httpServer.listen(port, () => {
    log.app(`Server running on port ${port}.`);

    // For testing purposes, to make sure the server is running.
    app.emit('server-running');
  });

  app.on('close', () => {
    log.app('Server closed.');
    server.close();
  });
});

export default app;
