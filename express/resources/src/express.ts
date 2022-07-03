import { usersLog } from './logger';
import cookieParser from 'cookie-parser';
import express_js, { Express } from 'express';
import fs from 'fs';
import path from 'path';

const projectRoot = path.join(__dirname, '../../../../../');
const logsPath = path.join(projectRoot, './logs');

export function getBasicExpress(): Express {
	if (!fs.existsSync(logsPath)) fs.mkdirSync(logsPath);
	const app = express_js();
	app.use(usersLog);
	app.use(cookieParser());
	app.use(express_js.json());
	app.use(express_js.urlencoded({ extended: false }));
	return app;
}
