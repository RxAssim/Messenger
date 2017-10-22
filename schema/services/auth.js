import jwt from 'jsonwebtoken';
import ValidationError from '../lib/ValidationError';

const generateToken = user =>
  jwt.sign(Object.assign({}, user.toJSON()), process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.JWT_EXP, 10),
  });
// Creates a new user account.  We first check to see if a user already exists
// with this email address to avoid making multiple accounts with identical addresses
// If it does not, we save the existing user.  After the user is created, it is
// provided to the 'req.logIn' function.  This is apart of Passport JS.
// Notice the Promise created in the second 'then' statement.  This is done
// because Passport only supports callbacks, while GraphQL only supports promises
// for async code!  Awkward!
export function signup({ User }, args) {
  const errors = [];
  return User.create(args)
    .then(createdUser => ({
      user: createdUser,
      token: generateToken(createdUser),
    }))
    .catch(err => {
      console.log(err);
      errors.push({
        key: 'email',
        message: 'The email address is already in use.',
      });
      throw new ValidationError(errors);
    });
}

export async function login({ User }, args) {
  return User.findOne({ where: { email: args.email } }).then(existingUser => {
    const errors = [];
    if (!existingUser) {
      errors.push({
        key: 'email',
        message: 'Wrong email',
      });
      throw new ValidationError(errors);
    }
    return existingUser
      .comparePassword(args.password)
      .then(isMatch => {
        if (!isMatch) {
          errors.push({
            key: 'password',
            message: 'Wrong password',
          });
          throw new ValidationError(errors);
        }
        console.log(existingUser.username);
        return {
          user: existingUser,
          token: generateToken(existingUser),
        };
      })
      .catch(() => {
        throw new ValidationError(errors);
      });
  });
}
