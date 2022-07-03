const colors = require('colors-console');
const { textSync } = require('figlet');

module.exports = {
	warning(dirName) {
		console.log('\n ' + colors(['yellow', 'reverse'], ' WARN ') + ` The folder named \'${ dirName }\' is invalid, please rename the folder.\n`);
	},
	error(msg) {
		console.log('\n ' + colors(['red', 'bright', 'reverse'], ' ERR ') + ` ${ msg }\n`);
	},
	logo() {
		console.log(textSync('TS-EXPRESS'));
		console.log(' Command list');
		console.log(' 1. ts-express create [projectName]');
		console.log(' 2. ts-express init');
		console.log(' 3. ts-express template');
	},
};
