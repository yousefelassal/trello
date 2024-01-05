import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../models/user'
import { Request, Response } from 'express'
import 'dotenv/config'

const userContext = async ({ req, res }:{ req:Request, res:Response }) => {
    const auth = req ? req.headers.authorization : null
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
}

export default userContext