
module.exports.index = function(req, res) {
  return res.json('Hi there');
};

module.exports.show = function(req, res) {
  throw new Error('Not implemented yet');
};

module.exports.create = function(req, res) {
  throw new Error('Not implemented yet');
};

module.exports.upsert = function(req, res) {
  throw new Error('Not implemented yet');
};

module.exports.patch = function(req, res) {
  throw new Error('Not implemented yet');
};

module.exports.destroy = function(req, res) {
  throw new Error('Not implemented yet');
};
