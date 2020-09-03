const faker = require('faker');
const fs = require('fs');

const Room = function (roomId, roomname, price, cleaningFee = 5, serviceFee = 5, tax = 10, maxAdults = 1, maxChildren = 0, maxInfants = 0, minNight = 1, maxNight = 1, ratings = null, numReviews = 0) {
  this.roomId = roomId;
  this.roomname = roomname;
  this.price = price;
  this.cleaningFee = cleaningFee;
  this.serviceFee = serviceFee;
  this.tax = tax;
  this.maxAdults = maxAdults;
  this.maxChildren = maxChildren;
  this.maxInfants = maxInfants;
  this.minNight = minNight;
  this.maxNight = maxNight;
  this.ratings = ratings;
  this.numReviews = numReviews;
}

Room.prototype.randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Room.prototype.generateRandomRoom = id => {
  const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];

  let roomId = id;
  let roomname = faker.name.findName() + roomNameAppendix[Room.prototype.randomIntFromInterval(0, roomNameAppendix.length - 1)];
  let price = Room.prototype.randomIntFromInterval(50, 200);
  let cleaningFee = 5;
  let serviceFee = 5;
  let tax = 10;
  let maxAdults = Room.prototype.randomIntFromInterval(1, 6);
  let maxChildren = Room.prototype.randomIntFromInterval(0, 4);
  let maxInfants = Room.prototype.randomIntFromInterval(0, 2);
  let minNight = Room.prototype.randomIntFromInterval(1, 2);
  let maxNight = Room.prototype.randomIntFromInterval(3, 6);
  let ratings = (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1);
  let numReviews = Room.prototype.randomIntFromInterval(0, 100);
  const randomRoom = new Room(roomId, roomname, price, cleaningFee, serviceFee, tax, maxAdults, maxChildren, maxInfants, minNight, maxNight, ratings, numReviews);
  return randomRoom;
};

// Below code is a lightly modified version of official documentation [https://nodejs.org/api/stream.html#stream_event_drain]
const writable = fs.createWriteStream(__dirname + '/roomData.json');

function writeTenMilRooms(writer, encoding, callback) {
  let i = 10;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const data = JSON.stringify(Room.prototype.generateRandomRoom(id));
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
writeTenMilRooms(writable, 'utf-8', () => {
  writable.end();
});
