import config from '../config.json';
import mailSender from '../mailSender';

const headers = {
  "Content-Type": "application/json",
  "Access-Controll-Allow-Origin": "localhost"
}

const resendPassword = (req, res, user) => {
  console.log(user);
  mailSender(user.email, user.pass, 'Your Diary password');
  res.writeHead(200, headers);
  res.write(JSON.stringify(req.query));
  res.end();
}

const resendCode = (req, res, user) => {
  console.log(user);  
  user.confirmation.code && mailSender(user.email, user.confirmation.code, 'Your Diary secret code');
  res.writeHead(200, headers);
  res.write(JSON.stringify(req.query));
  res.end();
}

const resendHandler = (req, res, dbClient) => {
  console.log(req.query);
  const dbUrl = process.env.PRODUCTION ? config.db.url : config.db.localUrl;
  dbClient.connect(dbUrl, (err, client) => {
    if (err) {
      const answer = { error: "connection to db failed" };
      res.writeHead(503, headers);
      res.write(JSON.stringify(answer));
      res.end();
    }
    else {
      const db = client.db(config.db.dbName);
      const usersCollection = db.collection(config.db.collections.users);
      usersCollection.findOne({email: req.query.email}, (err, result) => {
        if (err) {
          const answer = { error: "db error" };
          res.writeHead(503, headers);
          res.write(JSON.stringify(answer));
          res.end();
        }
        else if (!result) {
          const answer = {
            error: "email or password is incorrect"
          }
          res.writeHead(401, headers);
          res.write(JSON.stringify(answer));
          res.end();
        }
        else {
          req.query.password && resendPassword(req, res, result);
          req.query.code && resendCode(req, res, result);
        }
      });
    }
  });
};

export default resendHandler;