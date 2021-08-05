import dotenv from 'dotenv';
import path from 'path';

const envResult = dotenv.config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'production' ? '.env' : 'dev.env'
  ),
});
export const env = envResult.parsed;
