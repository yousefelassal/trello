import cors from 'cors';
import "dotenv/config"
import express, { Request, Response } from 'express';
import { createUploadthingExpressHandler } from "uploadthing/express"
import { UTApi } from 'uploadthing/server';
import { uploadRouter } from './router'
// import config from './utils/config'
// import mongoose from 'mongoose'
// mongoose.set('strictQuery', false)

// console.log('connecting to', config.MONGODB_URI)

// mongoose.connect(config.MONGODB_URI as string)
//   .then(() => {
//     console.log('connected to MongoDB')
//   })
//   .catch((error) => {
//     console.log('error connection to MongoDB:', error.message)
//   })

const app = express();
const utapi = new UTApi()

app.use(cors());
app.get('/', (req, res) => res.send('Hello from uploadthing api'));

app.use(
    '/api/uploadthing',
    createUploadthingExpressHandler({
        router: uploadRouter,
    })
)

const deleteRouter = express.Router()

deleteRouter.post('/:id', async (req:Request, res:Response) => {
    const key = req.params.id
    if (!key) {
        res.status(400).send('missing key')
        return
    }
    try {
        await utapi.deleteFiles(key)
        res.status(200).send('deleted')
    } catch (err) {
        res.status(500).send(err)
    }
})

app.use('/api/uploadthing/delete', deleteRouter)

app.listen(process.env.PORT || 3000, () => console.log(`Server listening on port ${process.env.PORT || 3000}!`) );
