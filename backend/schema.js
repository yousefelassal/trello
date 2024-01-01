const { makeExecutableSchema } = require('@graphql-tools/schema')
const merge = require('lodash/merge')
const {
    typeDefs: User,
    resolvers: userResolvers
} = require('./schemas/user')

const {
  typeDefs: Board,
  resolvers: boardResolvers
} = require('./schemas/board')

const Query = `
  type Query {
    test: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
    Query: {
        test: () => 'Hello World'
    },
    Mutation: {}
};

const schema = makeExecutableSchema({
    typeDefs: [Query, User, Board],
    resolvers: merge(resolvers, userResolvers, boardResolvers),
    logger: { log: e => console.log(e) }
});

module.exports = schema