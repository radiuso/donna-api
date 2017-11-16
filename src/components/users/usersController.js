const usersService = require('./usersService');

const index = (req, res) => {
  usersService.findAll().then((users) => {
    return res.json({
      users,
    });
  });
};

const show = (req, res) => {
  throw new Error('Not implemented yet');
};

const create = (req, res) => {
  throw new Error('Not implemented yet');
};

const upsert = (req, res) => {
  throw new Error('Not implemented yet');
};

const patch = (req, res) => {
  throw new Error('Not implemented yet');
};

const destroy = (req, res) => {
  throw new Error('Not implemented yet');
};

module.exports = {
  index,
  show,
  create,
  upsert,
  patch,
  destroy,
};
