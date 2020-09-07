const Sequelize = require('sequelize');
const Reservations = require('./reservations.js');
const db = require('../index.js')

const Room = db.define('rooms', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  roomname: Sequelize.STRING,
  price: Sequelize.INTEGER,
  cleaning_fee: Sequelize.DOUBLE,
  service_fee: Sequelize.DOUBLE,
  tax: Sequelize.DOUBLE,
  max_adults: Sequelize.SMALLINT,
  max_children: Sequelize.SMALLINT,
  max_infants: Sequelize.SMALLINT,
  min_night: Sequelize.SMALLINT,
  max_night: Sequelize.SMALLINT,
  ratings: Sequelize.DECIMAL(2, 1),
  num_reviews: Sequelize.INTEGER,
}, { timestamps: false });

Reservations.associate = (models) => {
  Room.hasMany(Reservations, { foreignKey: 'room_id' });
}

module.exports = Room;