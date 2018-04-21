import config from '../config.json';
import mailSender from '../mailSender';

const headers = {
  "Content-Type": "application/json",
  "Access-Controll-Allow-Origin": "localhost"
}

const generateSecretCode = () => {
  return Math.ceil(Math.random() * 100000);
}

export default function signupHandler (req, res, dbClient) {
  console.log(req.body.email, req.body.pass);
  const userEmail = req.body.email;
  const userPass = req.body.pass;
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

      usersCollection.findOne({email: userEmail}, (err, result) => {
        if (err) throw err;
        if (result) {
          const body = {
            error: "current email already exists"
          };
          res.writeHead(401, headers);
          res.write(JSON.stringify(body));
          res.end();
        }
        else {
          const secretCode = generateSecretCode();
          const body = { 
            email: userEmail, 
            pass: userPass, 
            confirmation: { 
              status: false,
              code: secretCode 
            } 
          };

          mailSender(userEmail, 'Secret Code', `Your secret code: ${secretCode}`)
            .then(() => {
              usersCollection.insertOne(body);
              res.writeHead(200, headers);
              res.write(JSON.stringify(body));
              res.end();
            })
            .catch(console.log);
        }
      });
    }
  });
}