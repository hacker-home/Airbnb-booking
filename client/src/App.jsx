/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import moment from "moment";
import Info from "./components/Info.jsx";
import Form from "./components/Form.jsx";
import css from "../../public/dist/App.css";
import axios from "axios";
import idGenerator from "../../biasedNumGenerator.js";
import withStyles from "isomorphic-style-loader/withStyles";

const App = (props) => {
  const [state, setState] = useState({
    roomId: 1,
    roomInfo: {
      roomname: "",
      price: 0,
      cleaningFee: 0,
      serviceFee: 0,
      tax: 0,
      maxGuest: "",
      minNight: 0,
      maxNight: 0,
      ratings: "",
      numReviews: 0,
    },
    biasedNum: idGenerator(),
    bookedDates: [],
    rendering: true,
  });

  useEffect(() => {
    initialize();
  }, []);

  const getRoomData = () => {
    const link = window.location.href.match(/id\s*=\s*(.*)/);
    if (link) {
      axios
        .get(`/room?id=${link[1]}`)
        .then(({ data }) => {
          updateRoomState(data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/room?id=${state.biasedNum}`)
        .then(({ data }) => {
          updateRoomState(data);
        })
        .catch((err) => console.log(err));
    }
  };

  const getBookingData = () => {
    const link = window.location.href.match(/id\s*=\s*(.*)/);
    if (link) {
      axios
        .get(`/booking?id=${link[1]}`)
        .then(({ data }) => {
          updateBookedDates(data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/booking?id=${state.biasedNum}`)
        .then(({ data }) => {
          updateBookedDates(data);
        })
        .catch((err) => console.log(err));
    }
  };

  const initialize = () => {
    getRoomData();
    getBookingData();
  };

  const handleRendering = () => {
    setState({ ...state, rendering: false });
  };

  const updateBookedDates = (results) => {
    const bookedDate = [];
    results.forEach((data) => {
      const nights = moment(data.check_out).diff(data.check_in, "d");
      for (let i = 0; i < nights; i += 1) {
        bookedDate.push(moment(data.check_in, "YYYY-MM-DD").add(i, "d"));
      }
    });
    setState({ ...state, bookedDates: bookedDate });
  };

  const updateRoomState = (result) => {
    const maxGuest = {
      adults: result.max_adults,
      children: result.max_children,
      infants: result.max_infants,
    };
    setState({
      ...state,
      roomId: result.id,
      roomInfo: {
        roomname: result.roomname,
        price: result.price,
        cleaningFee: result.cleaning_fee,
        serviceFee: result.service_fee,
        tax: result.tax,
        maxGuest: maxGuest,
        minNight: result.min_night,
        maxNight: result.max_night,
        ratings: result.ratings,
        numReviews: result.num_reviews,
      },
    });
  };

  const { roomId, roomInfo, bookedDates, rendering } = state;
  const divStyle = {
    height: "16px",
    width: "16px",
    display: "block",
    fill: "rgb(118, 118, 118)",
  };
  const app = (
    <div className={css.app}>
      <button
        type="submit"
        className={css.xbutton}
        onClick={handleRendering}
      >
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-label="Close"
          focusable="false"
          style={divStyle}
        >
          <path
            d="m23.25 24c-.19 0-.38-.07-.53-.22l-10.72-10.72-10.72 10.72c-.29.29-.77.29-1.06 0s-.29-.77 0-1.06l10.72-10.72-10.72-10.72c-.29-.29-.29-.77 0-1.06s.77-.29 1.06 0l10.72 10.72 10.72-10.72c.29-.29.77-.29 1.06 0s .29.77 0 1.06l-10.72 10.72 10.72 10.72c.29.29.29.77 0 1.06-.15.15-.34.22-.53.22"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <div>
        <Info
          price={roomInfo.price}
          reviews={roomInfo.numReviews}
          ratings={roomInfo.ratings}
        />
      </div>
      <div className={css.dividingSection} />
      <div>
        <Form
          guest={roomInfo.maxGuest}
          price={roomInfo.price}
          cleaningFee={roomInfo.cleaningFee}
          serviceFee={roomInfo.serviceFee}
          tax={roomInfo.tax}
          minNight={roomInfo.minNight}
          maxNight={roomInfo.maxNight}
          bookedDates={bookedDates}
          roomId={roomId}
          roomname={roomInfo.roomname}
          reviews={roomInfo.numReviews}
          ratings={roomInfo.ratings}
        />
      </div>

      <div className={css.notYet}>You won’t be charged yet</div>
      <div className={css.dividingSection} />
      <div className={css.image}>
        <div className={css.lower}>New lower price</div>
        <div className={css.lowerPrice}>
          Price for your trip dates was just lowered by $71.
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ float: "right", display: "stikcy" }}>
      {rendering ? app : null}
    </div>
  );
};

export default withStyles(css)(App);
