import React from "react";

import "./BookingList.css";

const bookingList = (props) => (
  <ul>
    {props.bookings.map((booking) => {
      return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <li key={booking._id} className="booking__item">
          <div className="booking_item_data">
            <h1>created by user: </h1>
            {booking.user.email} -{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div className="booking__item_actions">
            <button
              className="btn"
              onClick={props.onDelete.bind(this, booking._id)}
            >
              Cancel{" "}
            </button>
          </div>
        </li>
      );
    })}
  </ul>
);

export default bookingList;
