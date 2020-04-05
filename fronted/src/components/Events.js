import React, { Component } from "react";

import Modal from "../components/modal/modal";
import Backdrop from "../components/Backdrop/backdrop";
import "./events.css";

class Events extends Component {
  state = {
    creating: false,
  };

  startCreateEventHandler = () => {
    this.setState({ creating: true });
  };

  modalConfirmHandler = () => {
    this.setState({ creating: false });
  };

  modalCancelHandler = () => {
    this.setState({ creating: false });
  };
  render() {
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
            <p>content</p>
          </Modal>
        )}
        <div className="events-control">
          <p>Add events </p>
          <button className="btn" onClick={this.startCreateEventHandler}>
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Events;
