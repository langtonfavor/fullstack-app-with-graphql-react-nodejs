const Event = require("../../models/events");

const { eventsTemplate } = require("./combine");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return eventsTemplate(event);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = eventsTemplate(result);
      const creator = await User.find(req.userId);

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(result);
      throw err;
    }
  },
};
