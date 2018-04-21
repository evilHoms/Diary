import config from '../config.json';

const headers = {
  "Content-Type": "application/json",
  "Access-Controll-Allow-Origin": "localhost"
}

export default function signinHandler (req, res, dbClient) {
  const userEmail = req.query.email;
  const userPass = req.query.pass;
  const secretCode = req.query.code ? req.query.code : null;
  console.log(userEmail, userPass, secretCode);

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

      usersCollection.findOne({email: userEmail, pass: userPass}, (err, result) => {
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
          if (result.confirmation.status) {
            res.writeHead(200, headers);
            res.write(JSON.stringify(result));
            res.end();
          }
          else {
            console.log(result.confirmation.code, secretCode);
            if (!secretCode || Number(secretCode) !== result.confirmation.code) {
              const answer = {
                error: "email confirmation is needed"
              }
              console.log('code 100 sent');
              res.writeHead(202, headers);
              res.write(JSON.stringify(answer));
              res.end();
            }
            else {
              usersCollection.update(
                { email: userEmail },
                { $set: { confirmation: { status: true } } }
              );
              res.writeHead(200, headers);
              res.write(JSON.stringify(result));
              res.end();
            }
          }
        }
      });
    }
  });
}