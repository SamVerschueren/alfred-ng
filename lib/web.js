'use strict';
const alfy = require('alfy');
const utils = require('./utils');
const constants = require('./constants');

exports.search = () => alfy
	.fetch(`${constants.BASE}/generated/docs/app/search-data.json`, {
		maxAge: constants.ONE_DAY,
		transform: items => {
			for (const item of items) {
				const pathSplit = item.path.split('/');

				item.stability = item.keywords.split(' ').indexOf('moved') === -1 ? 'unknown' : 'deprecated';
				item.package = pathSplit[0] === 'api' && pathSplit.length > 1 ? `@angular/${pathSplit[1]}` : undefined;
			}

			return items.sort((item1, item2) => item1.path.localeCompare(item2.path));
		}
	})
	.then(modules => {
		const items = modules.map(x => {
			const url = `${constants.BASE}/${x.path}`;

			return {
				title: x.title,
				autocomplete: x.title,
				keywords: x.keywords,
				subtitle: utils.createSubtitle(x),
				arg: url,
				quicklookurl: url,
				icon: constants.TYPES.indexOf(x.type) === -1 ? undefined : {path: `./icons/${x.type}.png`},
				mods: {
					alt: {
						subtitle: x.stability
					}
				}
			};
		});

		return alfy.inputMatches(items, 'keywords');
	});
