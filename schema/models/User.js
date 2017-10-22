import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      instanceMethods: {
        comparePassword(candidatePassword) {
          return new Promise((resolve, reject) => {
            bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
              if (err) {
                reject(err);
              }
              resolve(isMatch);
            });
          });
        },
      },
    },
  );

  User.associate = models => {
    User.belongsToMany(models.Team, {
      through: 'member',
      foreignKey: { name: 'userId', field: 'user_id' },
    });
    User.belongsToMany(models.Channel, {
      through: 'channel_member',
      foreignKey: { name: 'userId', field: 'user_id' },
    });
  };

  User.beforeCreate(user =>
    bcrypt.hash(user.password, 10).then(hashedPw => {
      user.password = hashedPw;
    }),
  );

  return User;
};
