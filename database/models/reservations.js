const Sequelize = require('sequelize');
const Room = require('./rooms.js');
const db = require('../index.js')

const Reservations = db.define('bookings', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  check_in: Sequelize.DATE,
  check_out: Sequelize.DATE,
  email: Sequelize.STRING,
  adults: Sequelize.INTEGER,
  children: Sequelize.INTEGER,
  infants: Sequelize.INTEGER,
  createdAt: Sequelize.DATE,
  roomId: {
    type: Sequelize.INTEGER,
    references: {
      model: 'rooms',
      key: 'roomId',
    },
  },
}, { timestamps: false });

Reservations.associate = (models) => {
  Reservations.belongsTo(models.Room, { foreignKey: 'roomId' });
};

module.exports = Reservations;
