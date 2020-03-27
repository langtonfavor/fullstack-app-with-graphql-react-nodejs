const bcrypt = require('bcryptjs');

const Event = require('../../models/events');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const events = async eventIds => {

try {
const events = await Event.find({_id: {$in: eventIds}});    
events.map(event => {
            return { 
                ...event._doc,
                 _id: event.id,
                 date: new Date(event._doc.date).toISOString(),
                  creator: user.bind(this, event.creator)
                };
        });
        return events;
    }catch(err) {
        throw err;
    } 
};

const singleEvent = async eventId => {
    try{
        const event = await Event.findById({eventId});
        return { 
            ...event._doc,
             _id: event.id,
              creator: user.bind(this, event.creator)}
    }catch(err) {
        throw err;
    }
};
const user = async userId => {
    try {
    const user = await User.findById(userId)
        return {
                ...user._doc,
                 _id: user.id,
                createdEvents: events.bind(this, user._doc.createdEvents)
            };
    }catch(err){
        throw err;
    }
};


module.exports = {
    events: async () => {
        try {
        const events = await Event.find();
            return events.map(event => {
                return {
                    ...event._doc,
                     _id: event.id,
                     date: new Date(event._doc.date).toISOString(),
                        creator: user.bind(this, event._doc.creator)
                    };
            });  
        } catch(err){
            return err;
               }         
    },

    bookings: async () => {
       try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return { ...booking._doc, 
                        _id: booking.id,
                        user: user.bind(this, booking._doc.user),
                        event: singleEvent.bind(this, booking._doc.event),
                         createdAt: new Date(booking._doc.createdAt).toISOString(),
                         updatedAt: new Date(booking._doc.updatedAt).toISOString(),
                };
            });
       } catch(err) {
           err;
       }
    },
    createEvent: async args => {             
        
        const event = new Event({
             title: args.eventInput.title,
             description:args.eventInput.description,
             price: +args.eventInput.price,
             date: new Date(args.eventInput.date),
             creator:  '5e7d24e1670207217bd2a598'   
        });
    let createdEvent;
    try {
    const result = await event.save();
        createdEvent = { 
            ...result._doc,
             _id:result._doc._id.toString(),
             date: new Date(event._doc.date).toISOString(),
              creator: user.bind(this, result._doc.creator)
            };
             
          const creator = await User.findById( '5e7d24e1670207217bd2a598');        
            
          if(!creator) {
                throw new Error("user not found...");
            }
            creator.createdEvents.push(event);
             await  creator.save();               
            
             return createdEvent;
        
        }catch(err) {                    
            throw err;
        }
    },    
    createUser: async args => {
        try{
    const existingUser = await User.findOne( { email: args.userInput.email } )
    if(user) {
                throw new Error("user exists");
            }
            const hashedPassowrd = await bcrypt.hash(args.userInput.password, 15);                
                       
            const user = new User({
                email: args.userInput.email,
                password: hashedPassowrd
            })
      const result =  await user.save();
        return {...result._doc, _id: result.id }
     
        } catch(err) {
        throw new Err;
    }      
     
},
bookEvent: async args => {
    const fetchedEvent = await Event.findOne( {_id: args.eventId });
    const booking = new Booking({
      user:'5e7d24e1670207217bd2a598',
      event: fetchedEvent    
    });
    const result = await booking.save();
    return { ...result._doc,
        _id: result.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString(),
     }; 
},
cancelBooking: async args => {
    try {
        const booking =  await Booking.findById(args.bookingId).populate('event');
        const event = { 
            ...booking.event._doc,
             _id: booking.event.id,
              creator: user.bind(this, booking.event._doc.creator)
             };
        await Booking.deleteOne({ _id: args.bookingId});
             return event;
    }catch(err){
        console.log(args.bookingId)
    }
}
};