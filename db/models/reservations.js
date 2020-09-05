const Sequelize = require('sequelize');
const Room = require('./rooms.js');
const db = require('../index.js')

const Reservations = db.define('reservations', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  check_in: Sequelize.DATE,
  check_out: Sequelize.DATE,
  email: Sequelize.STRING,
  adults: Sequelize.INTEGER,
  children: Sequelize.INTEGER,
  infants: Sequelize.INTEGER,
  days_booked: Sequelize.TEXT,
  createdAt: Sequelize.DATE,
  room_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rooms',
      key: 'id',
    },
  },
}, { timestamps: false });

Reservations.associate = (models) => {
  Reservations.belongsTo(Room, { foreignKey: 'room_id' });
}

module.exports = Reservations;