const DataLoader = require("dataloader");
const Event = require("../../models/events");
const User = require("../../models/user");
const { dateToString } = require("../../HelperData/date");

const eventsLoader = new DataLoader((eventIds) => {
  return events(eventIds);
});

const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return eventsTemplate(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await eventsLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};

const userLoader = new DataLoader((userIds) => {
  console.log(userIds);
  return User.find({ _id: { $in: userIds } });
});

const user = async (userId) => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: eventsLoader.load.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const eventsTemplate = (event) => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const userTemplate = (u) => {
  return {
    ...u._doc,
    _id: u.id,
    date: dateToString(u._doc.date)    
  };
};

const bookingTemplate = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

exports.eventsTemplate = eventsTemplate;
exports.bookingTemplate = bookingTemplate;
