#!/usr/bin/env node

const open = require('open');
const path = require('path');
const ls = require('log-symbols');
const ora = require('ora');
const process = require('node:process');
const { init } = require('../src');
const { warning, error, logo } = require('../src/logger');
const { isDir } = require('../src/files');

const pwd = process.cwd();
const mode = process.argv[2];
if (mode === 'create') {
	init(process.argv[3], pwd);
} else if (mode === 'init') {
	const dirList = require('fs').readdirSync(pwd);
	const isEmpty = dirList.length === 0 || dirList.every(f => isDir(path.join(pwd, f)) && f.charAt(0) === '.');
	if (isEmpty) {
		const { name: currentDir } = path.parse(pwd);
		// 名称不合法
		if (/[A-Z|\s]+/g.test(currentDir)) warning(currentDir);
		init(currentDir, pwd, true);
	} else {
		error('The current directory is not empty!');
	}
} else if (['template', 'show'].includes(mode)) {
	const spinner = ora('Jumping to the template publishing page of ts-express.').start();
	open('https://gitee.com/ken200461/nichengkai/tree/master/express-template').then(() => {
		spinner.stop();
		console.log(ls.success, 'Successfully opened!');
	});
} else {
	logo();
}
