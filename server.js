import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jwt from 'express-jwt';
import graphqlHTTP from 'express-graphql';
import schema from './schema';
import SerializeUser from './schema/lib/SerializeUser';
import ValidationErrors from './schema/lib/ValidationError';

dotenv.config();

const app = express();
const logger = morgan('combined');

// Configure mongoose promise
mongoose.Promise = Promise;

// Connect DB
mongoose.connection
  .openUri(process.env.MONGO_URI)
  .once('open', () => {
    console.log('DB is ready !');
  })
  .on('error', error => {
    console.warn('Warning', error);
  });

// =========>Middleware<=========

app.use(logger);

app.use(
  '/graphql',
  jwt({
    secret: String(process.env.JWT_SECRET),
    credentialsRequired: false,
  }),
  graphqlHTTP(req => ({
    schema,
    context: {
      viewer: SerializeUser(req),
    },
    formatError: error => ({
      message: error.message,
      state: error.originalError && error.originalError.state,
      // locations: error.locations,
      // path: error.path,
    }),
    graphiql: true,
    pretty: true,
  })),
);

app.use((err, req, res, next) => {
  if (err) {
    res.status(401).send('Wrong token.');
  }
  next();
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening to ${process.env.SERVER_PORT}`);
});
