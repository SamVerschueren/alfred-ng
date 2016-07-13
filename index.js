'use strict';
const got = require('got');
const alfy = require('alfy');

const TYPES = ['class', 'const', 'var', 'let', 'decorator', 'directive', 'enum', 'function', 'interface'];

const getApiList = () => alfy.fetch('https://angular.io/docs/ts/latest/api/api-list.json', {maxAge: 86400000})
	.then(result => {
		const modules = Object.keys(result);
		let items = [];

		for (const module of modules) {
			items = items.concat(result[module]);
		}

		return items;
	});

getApiList()
	.then(modules => {
		const items = modules.map(x => {
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

		alfy.output(alfy.inputMatches(items, 'title'));
	});
