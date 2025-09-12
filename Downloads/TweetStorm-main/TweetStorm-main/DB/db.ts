import {
  DB_CLIENT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '@/api-utils/constants';
import Knex from 'knex';

const db = Knex({
  client: DB_CLIENT,
  connection: {
    host: DB_HOST,
    port: Number(DB_PORT),
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: 'utf8mb4',
  },
});

export default db;
