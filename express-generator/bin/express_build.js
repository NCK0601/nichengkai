#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ls = require('log-symbols');
const ora = require('ora');
const colors = require('colors-console');
const process = require('node:process');
const pwd = path.resolve(process.cwd());
const { exec } = require('child_process');
const { build: { exclude, packageManager } } = require(path.join(pwd, './config/config.default.ts'));
const { version: toolVersion } = require('../package.json');
const { deleteDir, fillStaticDirs } = require('../src/files');
const { getPackageJSON } = require('../src/package');

console.log(ls.info, `TypeScript-Express v${ toolVersion }`);
const spinner = ora('Packaging Tool starts running ...').start();

let {
	compilerOptions: { outDir },
} = require(path.join(pwd, './tsconfig.json'));

const relativeOutPath = outDir;
outDir = path.join(pwd, outDir);

// 删除上次打包的文件
if (fs.existsSync(outDir)) {
	spinner.text = 'Delete the last packaged file.';
	deleteDir(outDir);
}

// 编译 ts 文件
spinner.text = 'Compile typescript file.';
exec(`cd ${ pwd } && tsc`);

if (!fs.existsSync(outDir)) throw new Error('Build Fail! Please retry.');

// 编写 package.json 文件
spinner.text = 'Write the package.json file.';
const { name, version, dependencies } = require(path.join(pwd, './package.json'));
fs.writeFileSync(path.join(outDir, './package.json'), getPackageJSON(name, version, dependencies));

// 复制静态目录
spinner.text = 'Copy static files.';
fillStaticDirs(pwd, outDir, exclude);

const assignManager = packageManager && ['yarn', 'npm', 'cnpm'].includes(packageManager);
if (assignManager) {
	spinner.text = 'Installing dependencies.';
	exec(`cd ${ outDir } && ${ packageManager } install`);
}

spinner.stop();
console.log('\n');
console.log(ls.success, 'Packaging is complete!');
if (!assignManager) console.log(ls.warning, 'Please install the dependencies by yourself.');
console.log(ls.info, `The packaged files are in ${ colors(['underline', 'blue'], relativeOutPath) }.`);
