const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const config = require('./utils/config')
const schema = require('./schema')
const userContext = require('./utils/context')

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

const server = new ApolloServer({schema})

startStandaloneServer(server, {
    listen: { port: config.PORT },
    context: userContext
}).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`)
})