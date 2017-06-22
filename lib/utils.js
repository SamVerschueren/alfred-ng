'use strict';
exports.createSubtitle = item => {
	let subtitle = item.stability === 'deprecated' ? '[DEPRECATED] ' : '';

	if (item.package) {
		subtitle += `${item.package} - `;
	}

	subtitle += item.docType || item.type;

	return subtitle;
};
