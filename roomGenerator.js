const faker = require('faker');
const fs = require('fs');

const roomNameAppendix = ['\'s Apartment', '\'s House', '\'s Loft', '\'s Condo'];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Random Rooms
function generateRandomRooms(roomId) {
  const room = {
    roomId: roomId,
    roomname: faker.name.findName()
      + roomNameAppendix[randomIntFromInterval(0, roomNameAppendix.length - 1)],
    price: randomIntFromInterval(50, 200),
    cleaning_fee: 5,
    service_fee: 5,
    tax: 10,
    max_guest: {
      adults: randomIntFromInterval(1, 6),
      children: randomIntFromInterval(0, 4),
      infants: randomIntFromInterval(0, 2),
    },
    min_night: randomIntFromInterval(1, 2),
    max_night: randomIntFromInterval(3, 6),
    ratings: (Math.random() * (5.0 - 1.0) + 1.0).toFixed(1),
    num_reviews: randomIntFromInterval(0, 100),
  };
  return room;
}

// Below code is a lightly modified version of official documentation [https://nodejs.org/api/stream.html#stream_event_drain]
const createRoomData = () => {
  const writable = fs.createWriteStream(__dirname + '/roomData.json');
  function tenMilRooms(writer, encoding, callback) {
    let i = 10000000;
    let id = 0;
    function write() {
      let ok = true;
      do {
        i -= 1;
        id += 1;
        const data = JSON.stringify(generateRandomRooms(id));
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
  tenMilRooms(writable, 'utf-8', () => {
    writable.end();
  });
};

createRoomData();