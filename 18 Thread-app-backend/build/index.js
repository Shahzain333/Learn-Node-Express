import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import cors from 'cors';
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    // app.use(express.json())
    // Create Graphql Server
    const gqlServer = new ApolloServer({
        typeDefs: `
           type Query {
                hello: String
                say(name: String): String
           }
        `, // Schema
        resolvers: {
            Query: {
                hello: () => `Hey there, I'm a graphql server`,
                say: (_, { name }) => `Hey ${name}, How are you ?`
            }
        } // Resolvers
    });
    // Start the gql Server
    await gqlServer.start();
    app.get('/', (req, res) => {
        res.json("Server is up and Running");
    });
    app.use('/graphql', cors(), express.json(), expressMiddleware(gqlServer));
    app.listen(PORT, () => {
        return console.log(`Server Started At Port ${PORT}`);
    });
}
init();
//# sourceMappingURL=index.js.map