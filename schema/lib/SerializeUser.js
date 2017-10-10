import { User } from '../models';

export default req => {
  if (req.user) {
    return User.findById(req.user.id);
  }
  return Promise.resolve(null);
};
