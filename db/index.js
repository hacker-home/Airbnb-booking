const Sequelize = require('sequelize');


 const db = new Sequelize('bookings', 'postgres', 'Lostinsauce92.', {
   dialect: "postgres",
   port: 5432,

   replication: {
     read: [
       { host: "172.31.31.215", username: "postgres", password: "Lostinsauce92." },
       { host: "172.31.31.215", username: "postgres", password: "Lostinsauce92." },
       { host: "172.31.31.215", username: "postgres", password: "Lostinsauce92." },
       { host: "172.31.31.215", username: "postgres", password: "Lostinsauce92." },
     ],
     write: { host: "172.31.31.215", username: "postgres", password: "Lostinsauce92." },
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
