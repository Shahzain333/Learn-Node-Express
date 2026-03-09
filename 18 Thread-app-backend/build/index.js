import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createAplloGraphqlServer from './graphql/index.js';
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());
    app.get('/', (req, res) => {
        res.json("Server is up and Running");
    });
    const gqlServer = await createAplloGraphqlServer();
    app.use('/graphql', expressMiddleware(gqlServer));
    app.listen(PORT, () => {
        return console.log(`Server Started At Port ${PORT}`);
    });
}
init();
//# sourceMappingURL=index.js.map