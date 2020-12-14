import express from 'express';
import { Router, Request, Response } from 'express-serve-static-core'
import {filterImageFromURL, deleteLocalFiles} from '../util/util';

const router: Router = express.Router();

router.get('/filteredimage', async (req: Request, res: Response) => {
  const imageUrl: string = req.query.image_url;
  try {
    const filteredImageUrl: string = await filterImageFromURL(imageUrl);

    res.status(200).sendFile(filteredImageUrl, async () => {
      await deleteLocalFiles([filteredImageUrl]);
    });
  } catch (error) {
    console.error(error);
    res.status(422).send({ error: `Failed to filter image ${imageUrl}` })
  }
});

export default router;