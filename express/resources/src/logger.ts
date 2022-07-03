import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { NextFunction, Request, Response } from 'express';
// @ts-ignore
import morgan from 'morgan';
// @ts-ignore
import fileStreamRotator from 'file-stream-rotator';
import { Middleware } from './types';

const projectRoot = path.join(__dirname, '../../../../../');
const logsPath = path.join(projectRoot, './logs');
const errorPath = path.join(logsPath, './error');
const clientPath = path.join(logsPath, './client');

//函数返回ip地址
function getClientIp(req: Request) {
	return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
}

const getLogType = (statusCode: number): string => {
	const code = Number.parseInt(statusCode.toString().charAt(0));
	if (code === 1 || code === 3) return 'INFO';
	if (code === 2) return 'SUCCESS';
	if (code === 4) return 'WARN';
	return 'ERROR';
};

export const usersLog: Middleware = (req: Request, res: Response, next: NextFunction) => {
	if (!fs.existsSync(clientPath)) fs.mkdirSync(clientPath);
	const fileName = moment(new Date()).format('YYYY-MM-DD') + '.log';
	const filePath = path.join(clientPath, fileName);
	const time = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	const code = res.statusCode;
	const type = getLogType(code);
	const protocol = req.protocol.toUpperCase();
	const method = req.method.toUpperCase();
	const url = req.url;
	const ip = getClientIp(req);
	const userAgent = req.headers['user-agent'];
	const log = `[${ time }] [${ type }] access - "${ protocol } ${ method } ${ url }" ${ code } "${ ip }" "${ userAgent }"\n`;
	try {
		fs.appendFileSync(filePath, log);
	} catch (e) {
		console.error(e);
	}
	next();
};

const dailyLogStream = fileStreamRotator.getStream({
	date_format: 'YYYY-MM-DD',
	filename: path.join(errorPath, '%DATE%.log'),
	frequency: 'daily',
	verbose: false,
});

export const develop: Function = morgan('dev');
export const production: Function = morgan('combined', {
	stream: dailyLogStream,
	immediate: false,
});
