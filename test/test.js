import test from 'ava';
import m from 'alfy-test';

test('`items` property is array', async t => {
	const result = await m('opt');

	t.true(Array.isArray(result));
	t.true(result.length > 0);
});

test('result', async t => {
	const result = await m('opt');
	const selectOption = result.find(item => item.title === 'NgSelectOption');

	t.deepEqual(selectOption, {
		title: 'NgSelectOption',
		autocomplete: 'NgSelectOption',
		subtitle: '@angular/common - directive',
		arg: 'https://angular.io/docs/ts/latest/api/common/index/NgSelectOption-directive.html',
		quicklookurl: 'https://angular.io/docs/ts/latest/api/common/index/NgSelectOption-directive.html',
		icon: {
			path: './icons/directive.png'
		},
		mods: {
			alt: {
				subtitle: 'experimental'
			}
		}
	});
});
