import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import AppController from './controllers/appController'
import FilterController from './controllers/filterController'

(async () => {
  dotenv.config();

  const port = process.env.PORT || 8082;

  const app = express();
  app.use(bodyParser.json());
  app.use('/', AppController, FilterController);
  app.listen( port, () => {
    console.log(`server running http://localhost:${port}` );
      console.log( `press CTRL+C to stop server` );
  } );
})();