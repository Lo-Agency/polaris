const service = require('./service');

function nameFunction(id) {
    const workspace = service.getUserById(id);
}

module.exports = nameFunction;