import cors from 'cors';
import "dotenv/config"
import express from 'express';
import { createUploadthingExpressHandler } from "uploadthing/express"
import { uploadRouter } from './router'
import config from './utils/config'
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI as string)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

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
