import { ApolloServer } from "@apollo/server";
import { User } from './user/index.js'

async function createAplloGraphqlServer() {
    // Create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
               hello: String
            }
            type Mutation {
              hello: String
              ${User.mutations}
            }
        `, // Schema
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        } // Resolvers
    })

    // Start the gql Server
    await gqlServer.start()

    return gqlServer
}

export default createAplloGraphqlServer;