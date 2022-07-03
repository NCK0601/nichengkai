module.exports = {
	getPackageJSON(name = 'packaged_project', version = '0.0.1', dependencies) {
		if (Object.keys(dependencies).length) throw new Error('The dependencies configuration item in the package.json is missing the necessary items.');

		return JSON.stringify({
			'name': name,
			'version': version,
			'main': './bin/www.ts',
			'scripts': {
				'dev': 'node ./bin/www.js',
				'start': `pm2 start ./bin/www.js --name ${ name || 'ts-express-default-name' }`,
				'start:watch': `pm2 start ./bin/www.js --name ${ name || 'ts-express-default-name' } --watch`,
				'stop': `pm2 stop ${ name || 'ts-express-default-name' } && pm2 delete ${ name || 'ts-express-default-name' }`,
				'restart': `pm2 restart ${ name || 'ts-express-default-name' }`,
			},
			dependencies,
		}, null, '\t');
	},
};
