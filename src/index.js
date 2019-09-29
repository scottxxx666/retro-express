import express from 'express';
import routes from './routes';
import container from './container';
const app = express();
const port = 3000;

app.use(container);
app.use(routes);

app.listen(port, () => console.log(`App listening on port ${port}!`));