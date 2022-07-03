const fs = require('fs');
const path = require('path');

const requireAll = (dirname) => {
	if (!fs.existsSync(dirname)) return [];

	const files = fs.readdirSync(dirname);
	const modules = [];

	for (const filename of files) {
		const fullPath = path.join(dirname, filename);
		if (/^([^.].*)\.(ts|js)$/.test(fullPath)) {
			const data = require(fullPath);
			modules.push(data[Object.keys(data)[0]]);
		}
	}

	return modules;
};

module.exports = { requireAll };

