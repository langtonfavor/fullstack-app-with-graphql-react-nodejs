const { buildSchema } = require('graphql');

module.exports =  buildSchema(`     

type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

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
    firstName:String!
    lastName: String!
    email: String!
    password: String!
    contact:String!
    createdEvents: [Event!]
}

type authData {
    userId:ID!
    token:String!
    tokenExpiriation: Float!
}


input EventInput {
    title: String,
     description: String!,
     date: String,
     price:Float!
}

input UserInput {
    firstName:String!
    lastName: String!
    contact:String!
    email: String!
    password: String!
}

type RootQuery {
    getUser(id: ID!): User
    getUsers: [User]
    events: [Event!]!
    user: [User!]!
    login(email:String!, password:String!): authData!
}

type RootMutation {
    createEvent(eventInput:EventInput): Event
    createUser(userInput:UserInput): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation

}
`)
