import { GraphQLScalarType } from 'graphql';
import { GraphQLError } from 'graphql/error';
import { Kind } from 'graphql/language';
import { isEmail } from 'validator';

const GraphQLEmailType = new GraphQLScalarType({
  name: 'Email',
  serialize: value => value.toLowerCase(),
  parseValue: value => value.toLowerCase(),
  parseLiteral: ast => {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Query error: Email is not a string, it is a: ${ast.kind}`,
        [ast],
      );
    }
    if (!isEmail(ast.value)) {
      throw new GraphQLError('Query error: Not a valid Email', [ast]);
    }
    if (ast.value.length < 4) {
      throw new GraphQLError(
        'Query error: Email must have a minimum length of 4.',
        [ast],
      );
    }
    if (ast.value.length > 300) {
      throw new GraphQLError('Query error: Email is too long.', [ast]);
    }
    return ast.value.toLowerCase();
  },
});

export default GraphQLEmailType;
