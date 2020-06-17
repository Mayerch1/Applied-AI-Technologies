import knex from "knex";
import { env } from 'process';
console.log("test" + env.DBHost + env.DBUser + env.DBPassword + env.DBName)
export let pool = knex({
  client: "mysql",
  connection: {
    host: env.DBHost,
    user: env.DBUser,
    password: env.DBPassword,
    database: env.DBName
  },
  pool: { min: 0, max: 10 }
});
