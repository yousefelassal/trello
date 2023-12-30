const { makeExecutableSchema } = require('@graphql-tools/schema')
import { merge } from 'lodash';
import {
    typeDef as User,
    resolvers as userResolvers
} from './schemas/user'

const Query = `
  type Query {
    
  }
`;

const resolvers = {
  Query: { 

  }
};

const schema = makeExecutableSchema({
    typeDefs: [Query, User],
    resolvers: merge(resolvers, userResolvers)
});

export default schema;