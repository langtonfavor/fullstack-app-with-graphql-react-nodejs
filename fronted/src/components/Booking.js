import React, { Component } from "react";

import BookingsList from "../components/BookingsList/BookingList";
import AuthContext from "../context/authContext";
import Spinner from "../components/spinner/spinner";

class Booking extends Component {
  state = {
    isLoading: false,
    bookings: [],
  };

  componentDidMount() {
    this.fetchBookings();
  }

  static contextType = AuthContext;

  fetchBookings = () => {
    this.setState({ isLoading: true });
    const reqBody = {
      query: `
                    query {
                      bookings {
                             _id
                             createdAt
                             updatedAt
                             user {
                                 _id
                                 email
                                 createdEvents {
                                     title
                                     description
                                     price
                                     date
                                 }
                             }

                        }
                    }
                  `,
    };

    // const token = this.context.token;

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then((resBody) => {
        console.log(resBody);
        const bookings = resBody.data.bookings;
        this.setState({ bookings, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  onDeleteHandler = (bookingId) => {
    this.setState({ isLoading: true });
    const reqBody = {
      query: `
                    mutation {
                      cancelBooking(bookingId: "${bookingId}") {
                          _id
                          title
                        }
                    }
                  `,
    };

    // const token = this.context.token;

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${this.context.token}`,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then((resBody) => {
        this.setState((prevState) => {
          const updatedBookings = prevState.bookings.filter((booking) => {
            return booking._id !== bookingId;
          });
          return { bookings: updatedBookings, isLoading: false };
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <BookingsList
            bookings={this.state.bookings}
            onDelete={this.onDeleteHandler}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Booking;
