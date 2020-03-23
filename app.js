const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const Event = require('./models/events')
const User = require('./models/user')
const app =  express();

app.use(bodyParser.json());

const events = eventIds => {
    return Event.find({_id: {$in: eventIds}})
    .then(events => {
        return events.map(event => {
            return { 
                ...event._doc,
                 _id: event.id,
                  creator: user.bind(this, event.creator)
                };
        });
    }).catch(err =>{
        throw err;
    })
}

const user = userId => {
    return User.findById(userId)
    .then(user => {
        return {...user._doc,
                 _id: user.id,
                createdEvents: events.bind(this, user._doc.createdEvents)
            };
    })
    .catch(err => {
        throw new Error;
    })
}

app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(`

            type Event {
                _id: ID!
                title: String!
                description: String!
                price: Float!
                date: String!
                creator: User!
            }

            type User {
                _id: ID!
                email: String!
                password: String
                createdEvents: [Event!]
            }

            input EventInput {
                title: String,
                 description: String!,
                 date: String,
                 price:Float!
            }

            input UserInput {
                email: String!
                password: String!
            }

            type RootQuery {
                events: [Event!]!
            } 

            type RootMutation {
                createEvent(eventInput:EventInput): Event
                createUser(userInput:UserInput): User
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),


        rootValue: {
            events: () => {

                return Event.find()
                .then(events => {
                    return events.map(event => {
                        return {...event._doc, _id: event.id,
                                creator: user.bind(this, event.creator)
                            };
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            },

            createEvent: args => {             
                
                const event = new Event({
                     title: args.eventInput.title,
                     description:args.eventInput.description,
                     price: +args.eventInput.price,
                     date: new Date(args.eventInput.date),
                     creator:  '5e77c5fffe230c1fb870348a'   
                });
                let createdEvent;

                return event
                .save()
                .then(result => {
                    createdEvent = { ...result._doc, _id:result._doc._id.toString()};
                     
                  return  User.findById( '5e77c5fffe230c1fb870348a');
                })
                .then( user => {
                    if(!user) {
                        throw new Error("user not found...");
                    }
                     user.createdEvents.push(event);
                     return user.save();               
                })
                .then(result => {
                    return createdEvent;
                })
                .catch(err => {                    
                    throw err;
                });
            },
            
            createUser: args => {
                return User.findOne({email: args.userInput.email}).then(user => {
                    if(user) {
                        throw new Error("user exists");
                    }
                    return bcrypt
                .hash(args.userInput.password, 15)                
                })                
                .then(hashedPassowrd => {
                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassowrd
                    });
              return user
             .save()
                })
             .then(res => {
                 return {...res._doc, _id: res.id }
             })
             .catch(err => {
                throw err;
            });      
             
       }
    },   

    graphiql: true    
    }) 
);
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-shard-00-00-yiuox.mongodb.net:27017,cluster0-shard-00-01-yiuox.mongodb.net:27017,cluster0-shard-00-02-yiuox.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`).then(() => {
app.listen(3000);

}).catch(err => {
    console.log(err);
});

