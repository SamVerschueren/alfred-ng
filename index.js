'use strict';
const alfy = require('alfy');

const BASE = 'https://angular.io';
const TYPES = ['class', 'const', 'var', 'let', 'decorator', 'directive', 'enum', 'function', 'interface', 'pipe'];
const ONE_DAY = 86400000;

alfy.fetch(`${BASE}/generated/docs/app/search-data.json`, {
	maxAge: ONE_DAY,
	transform: data => data.sort((item1, item2) => item1.path.localeCompare(item2.path))
})
.then(modules => {
	const items = modules.map(x => {
		const url = `${BASE}/${x.path}`;

		return {
			title: x.title,
			autocomplete: x.title,
			keywords: x.keywords,
			subtitle: x.type,
			arg: url,
			quicklookurl: url,
			icon: TYPES.indexOf(x.type) === -1 ? undefined : {path: `./icons/${x.type}.png`}
		};
	});

	alfy.output(alfy.inputMatches(items, 'keywords'));
});
