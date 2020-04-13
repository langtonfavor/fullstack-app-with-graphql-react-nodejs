import React, { Component } from "react";

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
  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <ul>
            {this.state.bookings.map((booking) => (
              /* eslint no-underscore-dangle: 0 */
              <li key={booking._id}>
                <h1>created by user: </h1>
                {booking.user.email} -{" "}
                {new Date(booking.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </React.Fragment>
    );
  }
}

export default Booking;
