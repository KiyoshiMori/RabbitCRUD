import { makeExecutableSchema } from 'graphql-tools';
import _ from 'lodash';

import RootDefinition from './RootDefinition';
import RootResolver from './RootResolver';

import testDefinition from './test/test';
import testResolver from './test/testResolver';

import UserDefinition from './User/UserDefinition.js';
import UserResolver from './User/UserResolver.js';

const resolvers = _.merge({}, RootResolver, testResolver, UserResolver);

const schema = makeExecutableSchema({
	typeDefs: [RootDefinition, testDefinition, UserDefinition],
	resolvers,
});

export default schema;
