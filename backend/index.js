const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('./utils/config')
const schema = require('./schema')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

console.log('connecting to', MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer(schema)

server.listen({ 
    listen: { port: config.PORT },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})