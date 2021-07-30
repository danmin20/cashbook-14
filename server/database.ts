import { createConnection } from 'typeorm';

export default async (): Promise<void> => {
  await createConnection({
    type: 'mysql',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PW,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    // synchronize: true,
    entities: [`${__dirname}/**/models/**/*{.ts,.js}`],
    extra: {
      charset: 'utf8mb4_general_ci',
    },
  });
};
