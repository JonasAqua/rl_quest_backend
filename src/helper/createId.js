const randomstring = require('randomstring')

module.exports = function createId() {
    return randomstring.generate(12);
}