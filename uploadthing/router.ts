import { createUploadthing, type FileRouter } from "uploadthing/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from './models/user'
import 'dotenv/config'

const f = createUploadthing({
  errorFormatter: (err) => {
    console.log("Error uploading file", err.message);
    console.log("  - Above error caused by:", err.cause);

    return { message: err.message };
  },
});

export const uploadRouter = {
  image: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1
    }
  })
  .middleware(async ({ req }) => {
    const auth = req ? req.headers.get('authorization') : null
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET as string
      ) as JwtPayload;
      const currentUser = await User.findById(decodedToken.id)
      if(!currentUser) {
        throw new Error('token missing or invalid')
      }
      return { currentUser }
    }
    return {}; // Add this line to return an empty object
  })
  .onUploadComplete(async ({ metadata }) => {
    console.log("Uploaded by user", metadata.currentUser?.name);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;