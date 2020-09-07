const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const memo = {};

const Reservation = function (roomId, checkIn = null, checkOut = null, email = null, adults = 1, children = 0, infants = 0, createdAt) {
  this.roomId = roomId;
  this.checkIn = checkIn;
  this.checkOut = checkOut;
  this.email = email;
  this.adults = adults;
  this.children = children;
  this.infants = infants;
  this.daysBooked = `["${moment.utc(this.checkIn).format('l LT')}","${moment.utc(this.checkOut).format('l LT')}")` || null;
  this.createdAt = createdAt || Date.now();
}

// min and max included
Reservation.prototype.randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// make sure this is within a 3 month time frame
Reservation.prototype.randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

Reservation.prototype.isNotOverlapWithOtherBookingDates = (roomId, startDate, endDate) => {
  const bookingsOnRoom = memo[`${this.roomId}`];
  if (bookingsOnRoom === undefined) {
    return true;
  }
  // Iterate all current bookings on room and then check new start and end date overlapping or not
  for (let i = 0; i < bookingsOnRoom.length; i += 1) {
    const booking = bookingsOnRoom[i];
    if (!((moment(this.checkIn) < moment(booking.checkIn)
      && moment(this.checkOut) <= moment(booking.checkIn))
      || (moment(this.checkIn) >= moment(booking.checkOut)
        && moment(this.checkOut) > moment(booking.checkOut)))) {
      return false;
    }
  }
  return true;
}

// Random Bookings
Reservation.prototype.generateRandomBooking = () => {
  let roomId = Reservation.prototype.randomIntFromInterval(1, 10000000);
  let startDate = moment(Reservation.prototype.randomDate(moment().toDate(), moment().add(2, 'months').toDate())).startOf('day').toDate();
  let endDate = moment(startDate).add(Reservation.prototype.randomIntFromInterval(1, 5), 'days').startOf('day').toDate();
  let email = faker.internet.email();
  let adults = Reservation.prototype.randomIntFromInterval(1, 5);
  let children = Reservation.prototype.randomIntFromInterval(0, 5);
  let infants = Reservation.prototype.randomIntFromInterval(0, 5);
  let daysBooked = `${this.startDate}, ${this.endDate}`;
  let createdAt = moment(startDate).subtract(Reservation.prototype.randomIntFromInterval(0, 30), 'days').toDate();
  let trial = 0;

  while (!Reservation.prototype.isNotOverlapWithOtherBookingDates(roomId, startDate, endDate)) {
    trial += 1;
    if (trial > 1) {
      return null;
    }
  }
  const randomReservation = new Reservation(roomId, startDate, endDate, email, adults, children, infants, createdAt);
  return randomReservation;
}

const writable = fs.createWriteStream(__dirname + '/data/bookingData.json');
function writeThirtyMilBookings(writer, encoding, callback) {
  let i = 15000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = JSON.stringify(Reservation.prototype.generateRandomBooking());
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
}
writeThirtyMilBookings(writable, 'utf-8', () => {
  writable.end();
});
