const Sequelize = require('sequelize');

const db = new Sequelize('bookings', 'joshuabrito', null, {
  dialect: "postgres",
  port: 5432,

  replication: {
    read: [
      { host: "127.0.0.1", username: "joshuabrito", password: "" },
      { host: "127.0.0.1", username: "joshuabrito", password: "" },
      { host: "127.0.0.1", username: "joshuabrito", password: "" },
      { host: "127.0.0.1", username: "joshuabrito", password: "" },
    ],
    write: { host: "127.0.0.1", username: "joshuabrito", password: "" },
  },
  pool: {
    max: 100,
    idle: 30000
  },
  logging: false,
})

db.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log(err))

module.exports = db;
