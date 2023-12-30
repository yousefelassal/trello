const { makeExecutableSchema } = require('@graphql-tools/schema')
import { merge } from 'lodash';

const Query = `
  type Query {
    
  }
`;

const resolvers = {
  Query: { 

  }
};

const schema = makeExecutableSchema({
    typeDefs: [Query],
    resolvers: merge(resolvers)
});

export default schema;