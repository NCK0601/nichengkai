const { exec } = require('child_process');
const path = require('path');
const ora = require('ora');
const ls = require('log-symbols');
const templatePath = path.join(__dirname, '../');

// 把字符串中的所有大写字母转换为小写字母
function slugify(str) {
	if (!str) throw new Error('Project name not set!');
	// 驼峰转换下划线
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

module.exports = {
	init(projectName, pwd, exist = false) {
		projectName = slugify(projectName);
		const projectPath = path.join(pwd, projectName);
		// 更新模板文件
		// ts-express-template
		const spinner = ora('Downloading template file ...').start();
		exec(`cd ${ templatePath } && git clone https://gitee.com/ken200461/ts-express-template.git`);
		spinner.text = 'Download successful!';
		spinner.text = 'Building project ...';
		// 复制模板文件到 projectPath
		
		spinner.stop();
		console.log(ls.success, 'Project build successfully!');
	},
};
