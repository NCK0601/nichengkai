const isConstructor = (val: any): boolean => val === 'constructor';
const isFunction = (val: any): boolean => typeof val === 'function';

export function getMethodsFromClass(instance: object) {
	const prototype = Object.getPrototypeOf(instance);
	const methodNames: string[] = Object.getOwnPropertyNames(prototype)
		.filter(item => !isConstructor(item) && isFunction(prototype[item]));
	const res: object = {};
	methodNames.forEach(methodName => {
		// @ts-ignore
		res[methodName] = prototype[methodName];
	});
	return res;
}
