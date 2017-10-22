// import { User } from '../models';

export default req => {
  if (req.user) {
    // const user = await User.findById(req.user.id);
    return req.user;
  }
  return null;
};
