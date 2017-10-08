import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required.'],
    unique: [true, 'Email already used'],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email already in use'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  channels: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// save the user's hashed password
UserSchema.pre('save', function hashPassword(next) {
  if (this.isModified('password') || this.isNew) {
    bcrypt
      .hash(this.password, 10)
      .then(hashedPassword => {
        this.password = hashedPassword;
        next();
      })
      .catch(err => {
        next(err);
      });
  } else {
    next();
  }
});

// compare password with db
UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      }
      resolve(isMatch);
    });
  });
};
// Duplicate the ID field.
UserSchema.virtual('id').get(function changeId() {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('user', UserSchema);

export default User;
