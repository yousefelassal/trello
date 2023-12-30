const { makeExecutableSchema } = require('@graphql-tools/schema')
const merge = require('lodash/merge')
const {
    typeDefs: User,
    resolvers: userResolvers
} = require('./schemas/user')

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
    typeDefs: [Query, User],
    resolvers: merge(resolvers, userResolvers),
    logger: { log: e => console.log(e) }
});

module.exports = schema