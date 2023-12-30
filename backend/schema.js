const { makeExecutableSchema } = require('@graphql-tools/schema')
import { merge } from 'lodash';
import {
    typeDef as User,
    resolvers as userResolvers
} from './schemas/user'

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

export default schema;