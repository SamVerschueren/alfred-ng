'use strict';
const got = require('got');
const alfy = require('alfy');

const KEY = 'api-list';
const TYPES = ['class', 'const', 'decorator', 'directive', 'enum', 'function', 'interface', 'var']
const search = new RegExp(`${alfy.input}`, 'i');
const now = Date.now();

const isExpired = timestamp => now - timestamp > 86400000;

const getApiList = () => {
	if (alfy.cache.has(KEY)) {
		const data = alfy.cache.get(KEY);

		if (!isExpired(data.timestamp)) {
			return Promise.resolve(data.items);
		}
	}

	return got('https://angular.io/docs/ts/latest/api/api-list.json', { json: true })
		.then(res => {
			const modules = Object.keys(res.body);
			let items = [];

			for (const module of modules) {
				items = items.concat(res.body[module]);
			}

			alfy.cache.set(KEY, {items, timestamp: now});
			return items;
		})
		.catch(err => {
			if (alfy.cache.has(KEY)) {
				// Use the cached data if something happened
				return alfy.cache.get(KEY).items;
			}

			throw err;
		});
}

getApiList()
	.then(modules => {
		const items = modules
			.filter(x => search.test(x.title))
			.map(x => {
				const url = `https://angular.io/docs/ts/latest/api/${x.path}`;

				return {
					title: x.title,
					autocomplete: x.title,
					subtitle: `${x.barrel} - ${x.docType}`,
					arg: url,
					quicklookurl: url,
					icon: TYPES.includes(x.docType) && {path: `./icons/${x.docType}.png`},
					mods: {
						alt: {
							subtitle: x.stability
						}
					}
				};
			});

		alfy.output(items);
	});
