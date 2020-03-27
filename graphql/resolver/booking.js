const Event = require('../../models/events');
const Booking = require('../../models/booking');
const {  bookingTemplate, eventsTemplate } = require('./combine') 

module.exports = {
        bookings: async () => {
           try {
                const bookings = await Booking.find();
                return bookings.map(booking => {
                    return bookingTemplate(booking);
                });
           } catch(err) {
               err;
           }
        },
       
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne( {_id: args.eventId });
        const booking = new Booking({
          user:'5e7d24e1670207217bd2a598',
          event: fetchedEvent    
        });
        const result = await booking.save();
        return bookingTemplate(result); 
    },
    cancelBooking: async args => {
        try {
            const booking =  await Booking.findById(args.bookingId).populate('event');
            const event = eventsTemplate(booking.event);
            await Booking.deleteOne({ _id: args.bookingId});
                 return event;
        }catch(err){
          }
    }
  };
