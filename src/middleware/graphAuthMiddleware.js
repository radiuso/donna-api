const objectAssignDeep = require('object-assign-deep');
const authService = require('../components/auth/authService');

const defaultResolvers = {
  Query: {},
  Mutation: {},
};

const apply = (componentResolvers) => {
  const resolvers = objectAssignDeep({}, defaultResolvers, componentResolvers);

  injectAuthentificationChecker(resolvers.Query);
  injectAuthentificationChecker(resolvers.Mutation);

  return resolvers;
};

// add checkAuthentification function before each resolver
const injectAuthentificationChecker = (resolvers) => {
  for (let query in resolvers) {
    if (resolvers.hasOwnProperty(query)) {
      const oldResolver = resolvers[query];

      // set resolver
      resolvers[query]  = (obj, args, context) =>
        authService.checkAuthentication(context)
        .then(() => oldResolver(obj, args, context));
    }
  }

  return resolvers;
};

module.exports = {
  apply,
};
