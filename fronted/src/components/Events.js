import React, { Component } from "react";

import Modal from "../components/modal/modal";
import Backdrop from "../components/Backdrop/backdrop";
import AuthContext from "../context/authContext";
import "./events.css";

class Events extends Component {
  state = {
    creating: false,
    events: []
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.titleElRef = React.createRef();
    this.priceElRef = React.createRef();
    this.dateElRef = React.createRef();
    this.descriptionElRef = React.createRef();
  }

  componentDidMount() {
     this.fetchEvents();
  }

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
    const title = this.titleElRef.current.value;
    const price = +this.priceElRef.current.value;
    const date = this.dateElRef.current.value;
    const description = this.descriptionElRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date === 0 ||
      description === 0
    ) {
      return;
    }
    const event = { title, price, date, description };
    console.log(event);

    const reqQuery = {
      query: `
                mutation {
                  createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date:"${date}" }) {
                        _id
                    }
                }
              `,
    };

    const token = this.context.token;

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      body: JSON.stringify(reqQuery),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "bearer " + token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed");
        }
        return res.json();
      })
      .then((resBody) => {
        this.fetchEvents();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };

  fetchEvents() {
      const reqBody = {
        query: `
                  query {
                    events {
                           _id
                           title
                           description
                           date
                           price
                      }
                  }
                `
      };

      //const token = this.context.token;

      fetch("http://localhost:3000/graphql", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("failed");
          }
          return res.json();
        })
        .then((resBody) => {
          const events = resBody.data.events;
          this.setState({events:events});
        })
        .catch((err) => {
          console.log(err);
        });
  }

  render() {
      const eventList = this.state.events.map(event => {
         return <li key={event._id} className="events_list_item">
             {event.title}</li>

      });
    return (
      <React.Fragment>
        {this.state.creating && <Backdrop />}
        {this.state.creating && (
          <Modal
            title="Add event"
            canCancel
            onCancel={this.modalCancelHandler}
            canConfirm
            onConfirm={this.modalConfirmHandler}
          >
            <form>
              <div className="form_control">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" ref={this.titleElRef}></input>
              </div>
              <div className="form_control">
                <label htmlFor="price">Price</label>
                <input type="number" id="price" ref={this.priceElRef}></input>
              </div>
              <div className="form_control">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" ref={this.dateElRef}></input>
              </div>
              <div className="form_control">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  rows="4"
                  ref={this.descriptionElRef}
                ></textarea>
              </div>
            </form>
          </Modal>
        )}
        {this.context.token && <div className="events-control">
          <p>Add events </p>
          <button className="btn" onClick={this.startCreateEventHandler}>
            Create Event
          </button>
      </div>}
        <ul className="events_list">{eventList}</ul>
      </React.Fragment>
    );
  }
}

export default Events;
