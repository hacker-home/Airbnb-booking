import http from "k6/http";
import { Rate } from "k6/metrics";
import biasedNumber from "./biasedNumGenerator";

export default function () {

  let random = biasedNumber.biasedNumGenerator();
  let headers = { 'Content-Type': 'application/json' };
  let data = {
    check_in: "2020-09-13T00:00:00-07:00",
    check_out: "2020-09-16T00:00:00-07:00",
    createdAt: "2020-09-04T19:53:54-07:00",
    email: 'jorge@gmail.com',
    guests: { adults: 3, children: 0, infants: 0 },
    roomId: random
  };

  data = JSON.stringify(data);

  let responses = http.batch([
    ['GET', `http://54.219.10.222/room?id=${random}`, { tags: { ctype: 'application/json' } }],
    ['GET', `http://54.219.10.222/booking?id=${random}`, { tags: { ctype: 'application/json' } }],
    ['POST', `http://54.219.10.222/booking?id=${random}`, data, { headers: headers }]
  ]);
}
