import rootHandler from './routes/rootHandler';
import signinHandler from './routes/signinHandler';
import signupHandler from './routes/signupHandler';
import resendHandler from './routes/resendHandler';
import config from './config.json';

const { root, auth, authResend } = config.routes;

export default function routes(app, dbClient) {
  app.get(root,  (req, res) => rootHandler(req, res, dbClient));
  app.get(auth,  (req, res) => signinHandler(req, res, dbClient));
  app.get(authResend, (req, res) => resendHandler(req, res, dbClient));
  app.post(auth, (req, res) => signupHandler(req, res, dbClient));
}
