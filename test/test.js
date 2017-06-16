import test from 'ava';
import alfyTest from 'alfy-test';

test.beforeEach(t => {
	t.context.alfy = alfyTest();
});

test('`items` property is array', async t => {
	const result = await t.context.alfy('opt');

	t.true(Array.isArray(result));
	t.true(result.length > 0);
});

test('cache', async t => {
	await t.context.alfy('opt');

	t.true(t.context.alfy.cache.size === 1);

	const key = `https://angular.io/generated/docs/app/search-data.json{"json":true,"maxAge":86400000}`.replace(/\./g, '\\.');
	const data = t.context.alfy.cache.get(key);
	const diff = (data.timestamp - Date.now()) / 1000;

	t.true(diff < 86400 && diff > 86395);
	t.true(Array.isArray(data.data));
	t.truthy(data.data.find(x => x.title === 'Component'));
});

test('result', async t => {
	const result = await t.context.alfy('opt');
	const selectOption = result.find(item => item.title === 'NgSelectOption');
	delete selectOption.keywords;

	t.deepEqual(selectOption, {
		title: 'NgSelectOption',
		autocomplete: 'NgSelectOption',
		subtitle: 'directive',
		arg: 'https://angular.io/api/forms/NgSelectOption',
		quicklookurl: 'https://angular.io/api/forms/NgSelectOption',
		icon: {
			path: './icons/directive.png'
		}
	});
});

test('web search', async t => {
	const result = await t.context.alfy('ahead-of-time');
	delete result[0].keywords;

	t.deepEqual(result[0], {
		title: 'Ahead-of-Time Compilation',
		autocomplete: 'Ahead-of-Time Compilation',
		subtitle: 'content',
		arg: 'https://angular.io/guide/aot-compiler',
		quicklookurl: 'https://angular.io/guide/aot-compiler'
	});
});
