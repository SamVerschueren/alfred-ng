'use strict';
const alfy = require('alfy');

const BASE = 'https://search-api.swiftype.com/api/v1/public/installs/VsuU7kH5Hnnj9tfyNvfK/suggest.json';
const LANGS = {
	js: 'JavaScript',
	ts: 'TypeScript'
};

const parseTitle = title => {
	title = title.split(' - ');
	const subtitle = title.pop() || '';
	const language = title.pop() || '';

	return {
		title: title.join(' - '),
		subtitle: `${subtitle} - ${LANGS[language] || language}`
	};
};

exports.search = search => alfy.fetch(`${BASE}?q=${search}`)
	.then(res => res.records.page)
	.catch(() => [])
	.then(records => records.map(x => {
		const title = parseTitle(x.title);

		return {
			title: title.title,
			autocomplete: title.title,
			subtitle: title.subtitle.toLowerCase(),
			arg: x.url,
			quicklookurl: x.url
		};
	}));
