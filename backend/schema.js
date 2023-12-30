const { makeExecutableSchema } = require('@graphql-tools/schema')
const merge = require('lodash')
const {
    typeDefs: User,
    resolvers: userResolvers
} = require('./schemas/user')

const Query = `
  type Query {
    test: String
  }
`;

const resolvers = {
  Query: { 
    test: () => 'Test success!'
  }
};

const schema = makeExecutableSchema({
    typeDefs: [Query, User],
    resolvers: merge(resolvers, userResolvers)
});

module.exports = schema