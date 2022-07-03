"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDecorators = exports.createMappingDecorator = void 0;
const url_1 = require("./utils/url");
const class_1 = require("./utils/class");
const createMappingDecorator = (method) => {
    return (path) => {
        return (_target, _propertyKey, descriptor) => {
            Reflect.defineMetadata('path', path, descriptor.value);
            Reflect.defineMetadata('method', method, descriptor.value);
        };
    };
};
exports.createMappingDecorator = createMappingDecorator;
function getRootPath(controller) {
    return Reflect.getMetadata('root', controller);
}
function getRoutes(instance) {
    const methods = (0, class_1.getMethodsFromClass)(instance);
    return Object.keys(methods).map(methodName => {
        const fn = methods[methodName];
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
function parseDecorators(controller) {
    const root = getRootPath(controller);
    return getRoutes(new controller()).map(route => {
        route.path = (0, url_1.resolve)(root, route.path);
        return route;
    });
}
exports.parseDecorators = parseDecorators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcmVzb3VyY2VzL3NyYy9kZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EscUNBQXNDO0FBQ3RDLHlDQUFvRDtBQUU3QyxNQUFNLHNCQUFzQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7SUFDeEQsT0FBTyxDQUFDLElBQVksRUFBbUIsRUFBRTtRQUN4QyxPQUFPLENBQUMsT0FBWSxFQUNaLFlBQTZCLEVBQzdCLFVBQThCLEVBQUUsRUFBRTtZQUN6QyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBVFcsUUFBQSxzQkFBc0IsMEJBU2pDO0FBRUYsU0FBUyxXQUFXLENBQUMsVUFBZTtJQUNuQyxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxRQUFnQjtJQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFBLDJCQUFtQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzlDLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFFNUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRS9CLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pELE9BQU87WUFDTixJQUFJO1lBQ0osTUFBTTtZQUNOLEVBQUU7WUFDRixVQUFVO1NBQ1YsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxVQUFlO0lBQzlDLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyQyxPQUFPLFNBQVMsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzlDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBQSxhQUFPLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQU5ELDBDQU1DIn0=