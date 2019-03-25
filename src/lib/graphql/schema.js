import { makeExecutableSchema } from 'graphql-tools';
import _ from 'lodash';

import RootDefinition from './RootDefinition';
import RootResolver from './RootResolver';

import testDefinition from './test/test';
import testResolver from './test/testResolver';

const resolvers = _.merge({}, RootResolver, testResolver);

const schema = makeExecutableSchema({
	typeDefs: [RootDefinition, testDefinition],
	resolvers,
});

export default schema;
