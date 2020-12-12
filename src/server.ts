import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init environment variables
  dotenv.config();

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  app.get('/filteredimage', async (req, res) => {
    var imageUrl = req.query.image_url;

    // Verify url is of image type
    if (!imageUrl || !(imageUrl.match(/\.(jpeg|jpg|gif|png)$/))) {
      res.status(422).send({ error: 'Invalid Image Url' });
    }

    // Filter Image
    try {
      const filteredImageUrl = await filterImageFromURL(imageUrl);

      let fileStream = fs.createReadStream(filteredImageUrl);
      fileStream.on('end', async () => await deleteLocalFiles([filteredImageUrl]));
      fileStream.pipe(res)
    } catch (error) {
      console.error(error);
      res.status(422).send({ error: `Failed to filter image ${imageUrl}`})
    }
  });

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();