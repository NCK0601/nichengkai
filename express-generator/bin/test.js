const download = require('download-git-repo');

download(
	'direct:https://gitee.com/ken200461/ts-express-template/repository/archive/master.zip',
	'/',
	{ clone: true },
	(err) => {
		console.log(err ? 'Error' : 'Success');
	},
);
