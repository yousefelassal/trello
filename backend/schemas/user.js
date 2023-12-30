const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { GraphQLError } = require('graphql')
require('dotenv').config()

const typeDefs = `
    type User {
        name: String!
        username: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(
            name: String!
            username: String!
            password: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
    Query: {
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Mutation: {
        createUser: async (root, args) => {
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(args.password, saltRounds)

            const user = new User({
                name: args.name,
                username: args.username,
                passwordHash
            })

            try {
                await user.save()
            } catch (error) {
                if(['User validation failed: username: Error, expected `username` to be unique. Value: `{}`'].includes(error.message)) {
                    throw new GraphQLError('Username is already taken', {
                        extensions: {
                            code: 'BAD_USER_INPUT'
                        }
                    })
                }
                throw new GraphQLError(error.message)
            }

            return user
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            const passwordCorrect = user === null
                ? false
                : await bcrypt.compare(args.password, user.passwordHash)

            if (!(user && passwordCorrect)) {
                throw new GraphQLError('invalid username or password', {
                    extensions: {
                        code: 'UNAUTHENTICATED'
                    }
                })
            }

            const userForToken = {
                username: user.username,
                id: user._id
            }

            return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
        }
    }
}

module.exports = {
    typeDefs,
    resolvers
}