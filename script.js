import http from "k6/http";
import { Rate } from "k6/metrics";
import biasedNumber from "./biasedNumGenerator.js";

export default function () {

  let random = biasedNumber();
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
    ['GET', `http://sdcloadbalancer-1748024864.us-west-1.elb.amazonaws.com/room?id=${random}`, { tags: { ctype: 'application/json' } }],
    ['GET', `http://sdcloadbalancer-1748024864.us-west-1.elb.amazonaws.com/booking?id=${random}`, { tags: { ctype: 'application/json' } }],
    ['POST', `http://sdcloadbalancer-1748024864.us-west-1.elb.amazonaws.com/booking?id=${random}`, data, { headers: headers }]
  ]);
}
