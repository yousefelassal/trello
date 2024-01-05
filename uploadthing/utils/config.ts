import 'dotenv/config'

const MONGODB_URI = process.env.NODE_ENV === 'development'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI


export default {
    MONGODB_URI
}