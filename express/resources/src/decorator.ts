import { Route } from './types';
import { resolve } from './utils/url';
import { getMethodsFromClass } from './utils/class';

export const createMappingDecorator = (method: string) => {
	return (path: string): MethodDecorator => {
		return (_target: any,
		        _propertyKey: string | symbol,
		        descriptor: PropertyDescriptor) => {
			Reflect.defineMetadata('path', path, descriptor.value);
			Reflect.defineMetadata('method', method, descriptor.value);
		};
	};
};

function getRootPath(controller: any) {
	return Reflect.getMetadata('root', controller);
}

function getRoutes(instance: object): Route[] {
	const methods = getMethodsFromClass(instance);
	return Object.keys(methods).map(methodName => {
		// @ts-ignore
		const fn = methods[methodName];
		// 取出定义的 metadata
		const path = Reflect.getMetadata('path', fn);
		const method = Reflect.getMetadata('method', fn);
		return {
			path,
			method,
			fn,
			methodName,
		};
	});
}

export function parseDecorators(controller: any): Route[] {
	const root = getRootPath(controller);
	return getRoutes(new controller()).map(route => {
		route.path = resolve(root, route.path);
		return route;
	});
}
