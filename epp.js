const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const app =  express();

app.use(bodyParser.json());

const events = [];


app.use(
    '/graphql',
    graphqlHttp({
        schema: buildSchema(`

        	type Event {
        		_id: ID!
        		title: String!
        		description: String!
        		price: float!
        		date: String!
        	}

        	input EventInput {
        		title: String,
        		 description: string!,
        		 date: String,
        		 price:float!
        	}

            type RootQuery {
                events: [Event!]!
            } 

            type RootMutation {
                createEvent(eventInput:EventInput): Event
            }

            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            events: () => {
                return events
            },

            createEvent: args => {
            	const event = {
            		_id: Math.random().toString(),
                    title: args.title,
                    description:args.description,
                    price: +args.price,
                    date: new date().toISOString()
            	};
            	events.push(event);
            } 
       },   

         graphiql: true    
    }) 
);

app.listen(3000);
