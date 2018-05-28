if (process.env.NODE_ENV === 'productio') {
    module.exports = require('./prod.js');
} else {
 module.exports = require('./dev.js');
}