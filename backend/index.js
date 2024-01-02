const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const config = require('./utils/config')
const schema = require('./schema')
const userContext = require('./utils/context')
const http = require('http')
const express = require('express')
const cors = require('cors')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema,
    cors: false
  })

  await server.start()

  app.use(
    '/',
    cors({origin: config.FRONTEND_URL}),
    express.json(),
    expressMiddleware(server, {
      context: userContext
    })
  )

  httpServer.listen(config.PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${config.PORT}`)
  })
}

start()