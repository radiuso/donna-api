
class BaseSchema {
  get requireAuth() {
    return true;
  }

  get definition() {
    return ``;
  }

  get query() {
    return ``;
  }

  get mutation() {
    return ``;
  }

  get resolvers() {
    return {};
  }
}

module.exports = BaseSchema;
