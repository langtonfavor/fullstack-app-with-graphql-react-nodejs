import React from 'react'
import "./EventItem.css"

const eventItem = props => (
    <li key={props.eventId} className="events_list_item">
        <div>
            <h1>{props.title}</h1>
            <h2>${props.price} - {props.date}</h2>
        </div>
        <div>
        <button className="btn" onClick={props.onDetail.bind(this, props.eventId)}>view details</button>
        </div>
    </li>
)

export default eventItem;
