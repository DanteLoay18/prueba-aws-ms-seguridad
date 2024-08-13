const auth = require('./auth');
const usuario = require('./usuario');

module.exports={
    ...auth,
    ...usuario
}