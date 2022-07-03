import path from 'path';
import { Route } from './types';
import { requireAll } from './utils/requireAll';
import { parseDecorators } from './decorator';

const projectRoot = path.join(__dirname, '../../../../../');
const controllerPath = path.join(projectRoot, './src/controller');

export function getControllers(): Route[] {
	let controllers: Route[] = [];
	requireAll(controllerPath).forEach(controller => {
		controllers.push(...parseDecorators(controller));
	});
	return controllers;
}
