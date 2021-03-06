/**
 * User model
 * @param {*} sequelize
 * @param {*} DataTypes
 */
module.exports = function(sequelize, DataTypes) {
  const UserModel = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Oops. Looks like you already have an account with this email address. Please try to login.',
        fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty',
        },
        isEmail: {
          msg: 'Email format not valid. ex: text@mycompany.com',
        }
      },
    },
    passwd: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'FirstName cannot be empty'
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'LastName cannot be empty'
        },
      },
    },
  });

  // Methods
  UserModel.prototype.verifyPassword = function(pwd) {
    // TODO hash
    return pwd === this.passwd;
  };

  return UserModel;
}
