// 참고: https://blog.doitreviews.com/development/2020-03-26-extend-express-request-type-in-typescript/

export {};

declare global {
  namespace Express {
    interface Request {
      // user?: { id: string};
      user?: import('./models/User').default;
    }
  }
}
