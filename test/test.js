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
