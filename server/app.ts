import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import router from './routes';
import createConnection from './database';

const app = express();
const FileStore = require('session-file-store')(session);

let corsOption = {
  origin: 'http://localhost:8080',
  credentials: true,
};

app.use(cors(corsOption));

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET as string,
    cookie: {
      httpOnly: false,
      secure: false,
    },
    store: new FileStore(),
  })
);

app.use(
  express.static(
    path.join(
      __dirname,
      process.env.NODE_ENV === 'production'
        ? '../../client/dist/src'
        : '../client/dist/src'
    )
  )
);

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.sendFile(
    path.join(
      __dirname,
      process.env.NODE_ENV === 'production'
        ? '../../client/dist/src'
        : '../client/dist/src',
      'index.html'
    )
  );
});
app.get('/:id', (req: Request, res: Response) => {
  res.sendFile(
    path.join(
      __dirname,
      process.env.NODE_ENV === 'production'
        ? '../../client/dist/src'
        : '../client/dist/src',
      'index.html'
    )
  );
});

// TODO: error handler 재작성
app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error('Not Found') as any;
  err.status = 404;
  next(err);
});
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(500).json({
    error: err.message,
  });
});

createConnection().then(() => {
  app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중');
  });
});
