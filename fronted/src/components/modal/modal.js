import React from "react";
import "./modal.css";

const modal = (props) => (
  <div className="modal">
    <header className="modal_header">
      <h1>{props.title}</h1>
    </header>
    <section className="model_content">{props.children}</section>

    <section className="model_action">
      {props.canCancel && (
        <button className="btn" onClick={props.onCancel}>
          cancel
        </button>
      )}
      {props.canConfirm && (
        <button className="btn" onClick={props.onConfirm}>
          confirm
        </button>
      )}
    </section>
  </div>
);
export default modal;
