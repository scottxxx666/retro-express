import express from 'express';
import routes from './routes';
import container from './container';
import auth from './middlewares/auth';
import errorHandler from './errors/handler';

const app = express();
const port = 3000;

app.use(express.json());
app.use(auth.unless({ path: ['/users/login'] }));
app.use(container);
app.use(routes);
app.use(errorHandler);

app.listen(port, () => console.log(`App listening on port ${port}!`));
