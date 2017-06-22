'use strict';
const alfy = require('alfy');
const uniqWith = require('lodash.uniqwith');
const api = require('./lib/api');
const web = require('./lib/web');

Promise.all([
	api.search(),
	web.search()
])
.then(results => {
	let items = Array.prototype.concat.apply([], results);
	items = uniqWith(items, (a, b) => a.arg + a.title === b.arg + b.title);

	alfy.output(items);
});
