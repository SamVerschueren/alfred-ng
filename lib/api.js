'use strict';
const alfy = require('alfy');
const utils = require('./utils');
const constants = require('./constants');

exports.search = () => alfy
	.fetch(`${constants.BASE}/generated/docs/api/api-list.json`, {
		maxAge: constants.ONE_DAY,
		transform: modules => {
			let items = [];

			for (const m of modules) {
				items.push({
					name: m.name,
					title: m.title,
					path: `api/${m.name}`,
					docType: 'module'
				});

				// Attach package
				m.items = m.items.map(item => {
					item.package = `@angular/${m.name}`;
					return item;
				});

				items = items.concat(m.items);
			}

			return items;
		}
	})
	.then(modules => {
		const items = modules.map(x => {
			const url = `${constants.BASE}/${x.path}`;

			return {
				title: x.title,
				autocomplete: x.title,
				subtitle: utils.createSubtitle(x),
				arg: url,
				quicklookurl: url,
				icon: constants.TYPES.indexOf(x.docType) !== -1 && {path: `./icons/${x.docType}.png`},
				mods: {
					alt: {
						subtitle: x.stability
					}
				}
			};
		});

		return alfy.inputMatches(items, 'title');
	});
