import express    from 'express';
import mongodb    from 'mongodb';
import favicon    from 'serve-favicon';
import path       from 'path';
import routes     from './routes.js';
import bodyParser from 'body-parser';

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 3000;

const app = express();
app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
routes(app, MongoClient);
app.listen(port, onServerStart);

function onServerStart() {
    const mode = process.env.PRODUCTION ? 'production' : 'dev';
    console.log('Server start on port: ' + port + ' in ' + mode + ' mode' );
}
