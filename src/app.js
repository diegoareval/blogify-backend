import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import config from './config/env.config';
import expressConfig from './infra/webserver/express';
import routes from './infra/webserver/routes';
import serverConfig from './infra/webserver/server';
import mongoDbConnection from './infra/database/mongo/connector';
import redisConnection from './infra/database/redis/connector';
// middlewares
import errorHandlingMiddleware from './infra/webserver/middlewares/errorHandlingMiddleware';

const app = express();
const server = require('http').createServer(app);

// express.js configuration (middlewares etc.)
expressConfig(app);

// server configuration and start
serverConfig(app, mongoose, server, config).startServer();

// DB configuration and connection create
mongoDbConnection(mongoose, config, {
  autoIndex: false,
  useCreateIndex: true,
  useNewUrlParser: true,
  keepAlive: 120,
  connectTimeoutMS: 1000,
  useUnifiedTopology: true
}).connectToMongo();

const redisClient = redisConnection(redis, config).createRedisClient();

// routes for each endpoint
routes(app, express, redisClient);


// error handling middleware
app.use(errorHandlingMiddleware);

// Expose app
export default app;
