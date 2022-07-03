import 'reflect-metadata';
import path from 'path';
import { notEmpty } from './utils';
import { getMethodsFromClass } from './utils/class';
import { TaskTime } from './types';
import moment from 'moment';
import fs from 'fs';

const projectRoot = path.join(__dirname, '../../../../../');
const tasksLogPath = path.join(projectRoot, './logs/tasks');

const now = new Date();

// 获取当前月的天数
const getDateNum = () => {
	return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

// ms s min h D W M Y
function parseLoop(str: string): number {
	let time = 0;
	const msList = str.match(/[0-9]+ms/g);
	if (msList) {
		msList
			.map(item => Number.parseFloat(item.replace('ms', '')))
			.forEach(t => {
				time += t;
			});
	}
	const sList = str.match(/[0-9]+s/g);
	if (sList) {
		sList
			.map(item => Number.parseFloat(item.replace('s', '')))
			.forEach(t => {
				time += t * 1000;
			});
	}
	const minList = str.match(/[0-9]+min/g);
	if (minList) {
		minList
			.map(item => Number.parseFloat(item.replace('min', '')))
			.forEach(t => {
				time += t * 1000 * 60;
			});
	}
	const hList = str.match(/[0-9]+h/g);
	if (hList) {
		hList
			.map(item => Number.parseFloat(item.replace('h', '')))
			.forEach(t => {
				time += t * 1000 * 60 * 60;
			});
	}
	const dList = str.match(/[0-9]+D/g);
	if (dList) {
		dList
			.map(item => Number.parseFloat(item.replace('D', '')))
			.forEach(t => {
				time += t * 1000 * 60 * 60 * 24;
			});
	}
	const wList = str.match(/[0-9]+W/g);
	if (wList) {
		wList
			.map(item => Number.parseFloat(item.replace('W', '')))
			.forEach(t => {
				time += t * 1000 * 60 * 60 * 24 * 7;
			});
	}
	const dateNum = getDateNum();
	const monList = str.match(/[0-9]+M/g);
	if (monList) {
		monList
			.map(item => Number.parseFloat(item.replace('M', '')))
			.forEach(t => {
				time += t * 1000 * 60 * 60 * 24 * dateNum;
			});
	}
	const yList = str.match(/[0-9]+Y/g);
	if (yList) {
		yList
			.map(item => Number.parseFloat(item.replace('Y', '')))
			.forEach(t => {
				time += t * 1000 * 60 * 60 * 24 * 365;
			});
	}
	return time;
}

function toSetTime(str: string): number[] {
	let arr = str.split(':').map(t => Number.parseInt(t));
	while (arr.length < 3) {
		arr.push(0);
	}
	return arr;
}

function countWeek(start: number, end: number): number {
	if (end >= start) return end - start;
	return start + 7 - end;
}

function beforeToday(time: number[]) {
	let nowTimeArr = toSetTime(moment(now).format('HH:mm:ss'));
	return !time.some((item, index) => item > nowTimeArr[index]);
}

function parseTime(
	time: string | number[],
	week: string | number,
	month: string | number,
): TaskTime {
	if (notEmpty(<string>week) && notEmpty(<string>month))
		throw new Error('@Week and @Month cannot be set at the same time.');

	let loop = 0;
	let delay: number;
	const oneDay = 1000 * 60 * 60 * 24;
	let start = new Date();

	// 设置 日-时间
	if (!notEmpty(<string>week) && !notEmpty(<string>month) && notEmpty(<string>time)) {
		// 循环时间为一天
		loop = oneDay;
		if (beforeToday(toSetTime(<string>time))) start.setDate(start.getDate() + 1);
		time = toSetTime(<string>time);
		start.setHours(time[0], time[1], time[2]);
		delay = start.getTime() - now.getTime();
		return { loop, delay };
	}

	time = toSetTime(<string>time || '00:00:00');
	// 设置默认时间
	start.setHours(time[0], time[1], time[2]);

	// 设置 月-日-时间
	if (notEmpty(<string>month)) {
		// 循环时间为一个月
		loop = oneDay * getDateNum();
		month = Number.parseInt(<string>month);
		if (now.getDate() > month || beforeToday(time)) start.setMonth(start.getMonth() + 1);
		start.setDate(month);
	}

	// 设置 周-时间
	if (notEmpty(<string>week)) {
		// 循环时间为一周
		loop = oneDay * 7;
		week = Number.parseInt(<string>week);
		let nextWeek = countWeek(now.getDay(), <number>week);
		if (beforeToday(time)) nextWeek += 7;
		start.setDate(start.getDate() + nextWeek);
	}

	delay = start.getTime() - now.getTime();
	return { loop, delay };
}

export const createTasksDecorator = (mode: string) => {
	return (params: string): MethodDecorator => {
		return (
			_target: any,
			_propertyKey: string | symbol,
			descriptor: PropertyDescriptor,
		) => {
			Reflect.defineMetadata(mode, params, descriptor.value);
		};
	};
};

function taskLogger(mode: string, className: string, ret?: any) {
	if (!fs.existsSync(tasksLogPath)) fs.mkdirSync(tasksLogPath);
	const fileName = moment(new Date()).format('YYYY-MM-DD') + '.log';
	const filePath = path.join(tasksLogPath, fileName);
	const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	let logString = `[${time}] ${mode} Task from class ${className} done!`;
	if (ret) logString += `Method return value: ${ret}.`;
	logString += '\n';
	try {
		fs.appendFileSync(filePath, logString);
	} catch (e) {
		console.error(e);
	}
}

export const doTask = (Task: any) => {
	const flag: boolean = Reflect.getMetadata('isTask', Task);
	if (!flag) return;
	const methods = getMethodsFromClass(new Task());
	for (const methodName in methods) {
		// @ts-ignore
		const fn = methods[methodName];
		const loop = Reflect.getMetadata('loop', fn);
		const time = Reflect.getMetadata('time', fn);
		const week = Reflect.getMetadata('week', fn);
		const month = Reflect.getMetadata('month', fn);
		if (notEmpty(loop)) {
			const loopTime = parseLoop(loop);
			setInterval(() => {
				taskLogger('Loop', Task.name, fn());
			}, loopTime);
		} else if (notEmpty(time, week, month)) {
			const { delay, loop } = parseTime(time, week, month);
			setTimeout(() => {
				taskLogger('Schedule', Task.name, fn());
				setInterval(() => {
					taskLogger('Schedule', Task.name, fn());
				}, loop);
			}, delay);
		}
	}
};
