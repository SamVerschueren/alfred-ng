'use strict';
const alfy = require('alfy');
const api = require('./lib/api');
const web = require('./lib/web');

Promise.all([
	api.search(),
	web.search(alfy.input)
]).then(result => {
	alfy.output(result[0].concat(result[1]));
});
