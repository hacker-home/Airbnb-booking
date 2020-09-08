const Sequelize = require('sequelize');

const db = new Sequelize('bookings', 'postgres', 'postgres', {
  host: "13.57.27.230",
  dialect: 'postgres',

  pool: {
    max: 100,
    min: 0,
    idle: 10000
  },
})
// const db = new Sequelize('bookings', 'postgres', null, {
//   dialect: "postgres",
//   port: 5432,

//   replication: {
//     read: [
//       { host: "13.57.27.230", username: "postgres", password: "postgres" },
//       { host: "13.57.27.230", username: "postgres", password: "postgres" },
//       { host: "13.57.27.230", username: "postgres", password: "postgres" },
//       { host: "13.57.27.230", username: "postgres", password: "postgres" },
//     ],
//     write: { host: "13.57.27.230", username: "postgres", password: "" },
//   },
//   pool: {
//     max: 100,
//     idle: 30000
//   },
//   logging: false,
// })

db.authenticate()
  .then(() => console.log('database connected'))
  .catch(err => console.log(err))

module.exports = db;
