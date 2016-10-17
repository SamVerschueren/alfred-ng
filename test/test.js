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

	const key = `https://angular.io/docs/ts/latest/api/api-list.json{"json":true,"maxAge":86400000}`.replace(/\./g, '\\.');
	const data = t.context.alfy.cache.get(key);
	const diff = (data.timestamp - Date.now()) / 1000;

	t.true(diff < 86400 && diff > 86395);
	t.true(Array.isArray(data.data.data));
	t.truthy(data.data.data.find(x => x.title === 'Component'));
});

test('result', async t => {
	const result = await t.context.alfy('opt');
	const selectOption = result.find(item => item.title === 'NgSelectOption');

	t.deepEqual(selectOption, {
		title: 'NgSelectOption',
		autocomplete: 'NgSelectOption',
		subtitle: '@angular/forms - directive',
		arg: 'https://angular.io/docs/ts/latest/api/forms/index/NgSelectOption-directive.html',
		quicklookurl: 'https://angular.io/docs/ts/latest/api/forms/index/NgSelectOption-directive.html',
		icon: {
			path: './icons/directive.png'
		},
		mods: {
			alt: {
				subtitle: 'stable'
			}
		}
	});
});
