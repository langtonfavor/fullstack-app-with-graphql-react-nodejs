const Event = require('../../models/events');
const { eventsTemplate } = require('./combine');

module.exports = {
      events: async () => {
          try {
          const events = await Event.findById();
              return events.map(event => {
                  return eventsTemplate(event);
              });  
          } catch(err){
              return err;
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
          createdEvent = eventsTemplate(result);
               
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
      }  }
  