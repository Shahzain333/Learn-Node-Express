import { ApolloServer } from "@apollo/server";
import { User } from './user/index.js'

async function createAplloGraphqlServer() {
    // Create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
            type Query {
               ${User.queries}
            }
            type Mutation {
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