const Sequelize = require('sequelize');


 const db = new Sequelize('bookings', 'postgres', '', {
   dialect: "postgres",
   port: 5432,

   replication: {
     read: [
       { host: "172.31.31.215", username: "postgres", password: "" },
       { host: "172.31.31.215", username: "postgres", password: "" },
       { host: "172.31.31.215", username: "postgres", password: "" },
       { host: "172.31.31.215", username: "postgres", password: "" },
     ],
     write: { host: "172.31.31.215", username: "postgres", password: "" },
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
