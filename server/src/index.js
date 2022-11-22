import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { MongoClient, ServerApiVersion } from 'mongodb';

import * as dotenv from 'dotenv';
dotenv.config();

const uri = "mongodb+srv://test:<password>@cluster0.ii9wtbl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
	const collection = client.db("test").collection("devices");
	// perform actions on the collection object
	client.close();
});


const books = [
	{
		title: 'The Awakening kek',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
];

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Query {
    books: [Book]
  }
  
  type Book {
    title: String
    author: String
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
	Query: {
		books: () => books,
	},
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
	listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
