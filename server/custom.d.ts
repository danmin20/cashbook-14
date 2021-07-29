export {};

declare global {
  namespace Express {
    interface Request {
      // user?: { id: string};
      user?: import('./models/User').default;
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string] } | id;
  }
}
