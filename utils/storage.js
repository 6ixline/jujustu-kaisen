const LocalStorage = require('node-localstorage').LocalStorage;
const ls = new LocalStorage('./scratch');
module.exports = ls;