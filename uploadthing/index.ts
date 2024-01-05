import cors from 'cors';
import "dotenv/config"
import express from 'express';
import { createUploadthingExpressHandler } from "uploadthing/express"
import { uploadRouter } from './router'

const app = express();
app.use(cors());
app.get('/', (req, res) => res.send('Hello from uploadthing api'));

app.use(
    '/api/uploadthing',
    createUploadthingExpressHandler({
        router: uploadRouter,
    })
)

app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}!`) );
