import path from 'path';
import 'reflect-metadata';
import express from 'express';
import { LoggerMode, MonthType, WeekType } from './src/types';
import { getControllers } from './src/router';
import { getBasicExpress } from './src/express';
import { develop, production } from './src/logger';
import { createMappingDecorator } from './src/decorator';
import { createTasksDecorator } from './src/task';
import { requireAll } from './src/utils/requireAll';
import { doTask } from './src/task';

const projectRoot = path.join(__dirname, '../../../../');
const tasksPath = path.join(projectRoot, './src/tasks');

/**
 * decorator.ts
 */

export const Controller = (root: string): ClassDecorator => {
	return target => {
		Reflect.defineMetadata('root', root, target);
	};
};

export const Put = createMappingDecorator('put');
export const Get = createMappingDecorator('get');
export const Post = createMappingDecorator('post');
export const Patch = createMappingDecorator('patch');
export const Delete = createMappingDecorator('delete');

/**
 * logger.ts
 */

export function logger(mode: LoggerMode): Function {
	if (['pro', 'production'].includes(mode)) return production;
	// '['dev', 'develop']
	return develop;
}

/**
 * router.ts
 */

export const app = getBasicExpress();

// 注册路由
export const controllers = (() => {
	const router = express.Router();
	getControllers().forEach(controller => {
		const { path, method, fn } = controller;
		router[method](path, (req, res, next) => {
			fn(req, res, next);
		});
	});
	return router;
})();

/**
 * task.ts
 */

// @Loop('100h')
// @Time('00:00:00')
// @Week('1')
// @Month('20')

export const Task: ClassDecorator = target => {
	Reflect.defineMetadata('isTask', true, target);
};

export const Loop: Function = createTasksDecorator('loop');
export const Time: Function = createTasksDecorator('time');

export const Week: Function = (week: WeekType): MethodDecorator => {
	return (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		Reflect.defineMetadata('week', week, descriptor.value);
	};
};

export const Month: Function = (month: MonthType): MethodDecorator => {
	return (_target: any, _propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		Reflect.defineMetadata('month', month, descriptor.value);
	};
};

export const doTasks = () => {
	requireAll(tasksPath).forEach(task => {
		if (task) doTask(task);
	});
};
