const Event = require("../../models/events");
const Booking = require("../../models/booking");
const { bookingTemplate, eventsTemplate } = require("./combine");

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("not authorised");
    }
    try {
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map((booking) => {
        return bookingTemplate(booking);
      });
    } catch (err) {
      err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("not authorised");
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent,
    });
    const result = await booking.save();
    return bookingTemplate(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("not authorised");
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");
      const event = eventsTemplate(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {}
  },
};
