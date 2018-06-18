var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'isitupornotq' }, function(err, tunnel) {
  console.log('LT running sub domain created')
})