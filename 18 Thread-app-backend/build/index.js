import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import createAplloGraphqlServer from './graphql/index.js';
import userService from './services/user.js';
async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());
    app.get('/', (req, res) => {
        res.json("Server is up and Running");
    });
    const gqlServer = await createAplloGraphqlServer();
    app.use('/graphql', expressMiddleware(gqlServer, {
        context: async ({ req }) => {
            // @ts-ignore
            const token = req.headers['token'];
            try {
                const user = userService.decodeJWTToken(token);
                return { user };
            }
            catch (error) {
                return {};
            }
        }
    }));
    app.listen(PORT, () => {
        return console.log(`Server Started At Port ${PORT}`);
    });
}
init();
//# sourceMappingURL=index.js.map