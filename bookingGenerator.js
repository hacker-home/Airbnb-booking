const faker = require('faker');
const moment = require('moment');
const fs = require('fs');

const bookings = [];
const bookingsByRoomCache = {};

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// make sure this is within a 3 month time frame
function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function isNotOverlapWithOtherBookingDates(roomId, startDate, endDate) {
  const bookingsOnRoom = bookingsByRoomCache[`${roomId}`];
  if (bookingsOnRoom === undefined) {
    return true;
  }
  // Iterate all current bookings on room and then check new start and end date overlapping or not
  for (let i = 0; i < bookingsOnRoom.length; i += 1) {
    const booking = bookingsOnRoom[i];
    if (!((moment(startDate) < moment(booking.check_in)
      && moment(endDate) <= moment(booking.check_in))
      || (moment(startDate) >= moment(booking.check_out)
        && moment(endDate) > moment(booking.check_out)))) {
      return false;
    }
  }
  return true;
}

function randomCheckInOutOnRoom(roomList, roomId) {
  let startDate = moment(randomDate(moment().toDate(), moment().add(2, 'months').toDate())).startOf('day').toDate();
  let endDate = moment(startDate).add(randomIntFromInterval(1, 5), 'days').startOf('day').toDate();
  let trial = 0;

  while (!isNotOverlapWithOtherBookingDates(roomId, startDate, endDate)) {
    trial += 1;
    if (trial > 1) {
      return null;
    }
    startDate = moment(randomDate(moment().toDate(), moment().add(2, 'months').toDate())).startOf('day').toDate();
    endDate = moment(startDate).add(randomIntFromInterval(1, 5), 'days').startOf('day').toDate();
  }

  return {
    check_in: startDate,
    check_out: endDate,
  };
}
// Random Bookings
function generateRandomBooking() {
  const roomId = randomIntFromInterval(1, 10000000);
  const randomCheckInOutDates = randomCheckInOutOnRoom(roomId);
  if (randomCheckInOutDates === null) {
    return null;
  }
  const booking = {
    roomId,
    email: faker.internet.email(),
    guests: {
      adults: randomIntFromInterval(1, 5),
      children: randomIntFromInterval(0, 5),
      infants: randomIntFromInterval(0, 5),
    },
    check_in: randomCheckInOutDates.check_in,
    check_out: randomCheckInOutDates.check_out,
    createdAt: moment(randomCheckInOutDates.check_in).subtract(randomIntFromInterval(0, 30), 'days').toDate(),
  };
  return booking;
}

const writable = fs.createWriteStream(__dirname + '/bookingData.json');
function writeThirtyMilBookings(writer, encoding, callback) {
  let i = 30000000;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = JSON.stringify(generateRandomBooking());
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
