import express from 'express';
import path from 'path';

const PORT = 5000;

const app = express();
app.use(express.static(path.join(__dirname, '../../dist')));
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.get('/api/from', (req, res) => {
  res.send({ geodata_from_app: req.query });
});

app.get('/api/to/', (req, res) => {
  res.send({ geodata_from_server: 'geojson_from_server, send to app' });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
