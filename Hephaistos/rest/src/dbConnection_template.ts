import knex from "knex";
export let pool = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "HSE"
  },
  pool: { min: 0, max: 10 }
});
