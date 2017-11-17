const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');

const { User } = require('./database');

const UserType = require('./components/users/userType');

const UserQueryRootType = new GraphQLObjectType({
  name: 'UserAppSchema',
  description: "User Application Schema Query Root",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of all Users",
      resolve: function() {
        return User.findAll();
      }
    }
  })
});

const UserAppSchema = new GraphQLSchema({
  query: UserQueryRootType
});

module.exports = UserAppSchema;
