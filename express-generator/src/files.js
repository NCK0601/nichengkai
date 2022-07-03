const fs = require('fs');
const path = require('path');

function isDir(path) {
	let stats = fs.statSync(path);
	return stats.isDirectory();
}

function copyFile(src, dst) {
	try {
		fs.createReadStream(src).pipe(fs.createWriteStream(dst));
	} catch (e) {
		console.error(src);
		throw e;
	}
}

function copyDir(src, dst) {
	if (!fs.existsSync(src)) fs.mkdirSync(src);
	let dirList = fs.readdirSync(src);
	dirList.forEach(t => {
		const srcPath = path.join(src, t);
		const targetPath = path.join(dst, t);
		if (isDir(srcPath)) {
			fs.mkdirSync(targetPath);
			copyDir(srcPath, targetPath);
		} else {
			copyFile(srcPath, targetPath);
		}
	});
}

function deleteDir(path) {
	let files = [];
	if (fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(file => {
				const curPath = path.join(path, file);
				if (fs.statSync(curPath).isDirectory()) {
					deleteDir(curPath);
				} else {
					fs.unlinkSync(curPath);
				}
			},
		);
		fs.rmdirSync(path);
	}
}

const validFile = (file, exclude) => !(exclude.includes(file) || /\.(lock|log|md)$/.test(file) || file === 'tsconfig.json');

function fillStaticDirs(src, dst, exclude = []) {
	const srcList = fs.readdirSync(src);
	srcList.forEach(f => {
		const srcPath = path.join(src, f);
		const targetPath = path.join(dst, f);
		if (isDir(srcPath) && ['public', 'src'].includes(f)) {
			if (!fs.existsSync(targetPath)) {
				fs.mkdirSync(targetPath);
				copyDir(srcPath, targetPath);
			}
		} else if (validFile(f, exclude)) {
			copyFile(srcPath, targetPath);
		}
	});
}

module.exports = {
	isDir,
	deleteDir,
	fillStaticDirs,
};
