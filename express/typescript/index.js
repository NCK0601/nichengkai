"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doTasks = exports.Month = exports.Week = exports.Time = exports.Loop = exports.Task = exports.controllers = exports.app = exports.logger = exports.Delete = exports.Patch = exports.Post = exports.Get = exports.Put = exports.Controller = void 0;
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const router_1 = require("./src/router");
const express_2 = require("./src/express");
const logger_1 = require("./src/logger");
const decorator_1 = require("./src/decorator");
const task_1 = require("./src/task");
const requireAll_1 = require("./src/utils/requireAll");
const task_2 = require("./src/task");
const projectRoot = path_1.default.join(__dirname, '../../../../');
const tasksPath = path_1.default.join(projectRoot, './src/tasks');
const Controller = (root) => {
    return target => {
        Reflect.defineMetadata('root', root, target);
    };
};
exports.Controller = Controller;
exports.Put = (0, decorator_1.createMappingDecorator)('put');
exports.Get = (0, decorator_1.createMappingDecorator)('get');
exports.Post = (0, decorator_1.createMappingDecorator)('post');
exports.Patch = (0, decorator_1.createMappingDecorator)('patch');
exports.Delete = (0, decorator_1.createMappingDecorator)('delete');
function logger(mode) {
    if (['pro', 'production'].includes(mode))
        return logger_1.production;
    return logger_1.develop;
}
exports.logger = logger;
exports.app = (0, express_2.getBasicExpress)();
exports.controllers = (() => {
    const router = express_1.default.Router();
    (0, router_1.getControllers)().forEach(controller => {
        const { path, method, fn } = controller;
        router[method](path, (req, res, next) => {
            fn(req, res, next);
        });
    });
    return router;
})();
const Task = target => {
    Reflect.defineMetadata('isTask', true, target);
};
exports.Task = Task;
exports.Loop = (0, task_1.createTasksDecorator)('loop');
exports.Time = (0, task_1.createTasksDecorator)('time');
const Week = (week) => {
    return (_target, _propertyKey, descriptor) => {
        Reflect.defineMetadata('week', week, descriptor.value);
    };
};
exports.Week = Week;
const Month = (month) => {
    return (_target, _propertyKey, descriptor) => {
        Reflect.defineMetadata('month', month, descriptor.value);
    };
};
exports.Month = Month;
const doTasks = () => {
    (0, requireAll_1.requireAll)(tasksPath).forEach(task => {
        if (task)
            (0, task_2.doTask)(task);
    });
};
exports.doTasks = doTasks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9yZXNvdXJjZXMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLDRCQUEwQjtBQUMxQixzREFBOEI7QUFFOUIseUNBQThDO0FBQzlDLDJDQUFnRDtBQUNoRCx5Q0FBbUQ7QUFDbkQsK0NBQXlEO0FBQ3pELHFDQUFrRDtBQUNsRCx1REFBb0Q7QUFDcEQscUNBQW9DO0FBRXBDLE1BQU0sV0FBVyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3pELE1BQU0sU0FBUyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0FBTWpELE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBWSxFQUFrQixFQUFFO0lBQzFELE9BQU8sTUFBTSxDQUFDLEVBQUU7UUFDZixPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBSlcsUUFBQSxVQUFVLGNBSXJCO0FBRVcsUUFBQSxHQUFHLEdBQUcsSUFBQSxrQ0FBc0IsRUFBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxRQUFBLEdBQUcsR0FBRyxJQUFBLGtDQUFzQixFQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLFFBQUEsSUFBSSxHQUFHLElBQUEsa0NBQXNCLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsUUFBQSxLQUFLLEdBQUcsSUFBQSxrQ0FBc0IsRUFBQyxPQUFPLENBQUMsQ0FBQztBQUN4QyxRQUFBLE1BQU0sR0FBRyxJQUFBLGtDQUFzQixFQUFDLFFBQVEsQ0FBQyxDQUFDO0FBTXZELFNBQWdCLE1BQU0sQ0FBQyxJQUFnQjtJQUN0QyxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFBRSxPQUFPLG1CQUFVLENBQUM7SUFFNUQsT0FBTyxnQkFBTyxDQUFDO0FBQ2hCLENBQUM7QUFKRCx3QkFJQztBQU1ZLFFBQUEsR0FBRyxHQUFHLElBQUEseUJBQWUsR0FBRSxDQUFDO0FBR3hCLFFBQUEsV0FBVyxHQUFHLENBQUMsR0FBRyxFQUFFO0lBQ2hDLE1BQU0sTUFBTSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEMsSUFBQSx1QkFBYyxHQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ3JDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN4QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUN2QyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDLENBQUMsRUFBRSxDQUFDO0FBV0UsTUFBTSxJQUFJLEdBQW1CLE1BQU0sQ0FBQyxFQUFFO0lBQzVDLE9BQU8sQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoRCxDQUFDLENBQUM7QUFGVyxRQUFBLElBQUksUUFFZjtBQUVXLFFBQUEsSUFBSSxHQUFhLElBQUEsMkJBQW9CLEVBQUMsTUFBTSxDQUFDLENBQUM7QUFDOUMsUUFBQSxJQUFJLEdBQWEsSUFBQSwyQkFBb0IsRUFBQyxNQUFNLENBQUMsQ0FBQztBQUVwRCxNQUFNLElBQUksR0FBYSxDQUFDLElBQWMsRUFBbUIsRUFBRTtJQUNqRSxPQUFPLENBQUMsT0FBWSxFQUFFLFlBQTZCLEVBQUUsVUFBOEIsRUFBRSxFQUFFO1FBQ3RGLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBSlcsUUFBQSxJQUFJLFFBSWY7QUFFSyxNQUFNLEtBQUssR0FBYSxDQUFDLEtBQWdCLEVBQW1CLEVBQUU7SUFDcEUsT0FBTyxDQUFDLE9BQVksRUFBRSxZQUE2QixFQUFFLFVBQThCLEVBQUUsRUFBRTtRQUN0RixPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELENBQUMsQ0FBQztBQUNILENBQUMsQ0FBQztBQUpXLFFBQUEsS0FBSyxTQUloQjtBQUVLLE1BQU0sT0FBTyxHQUFHLEdBQUcsRUFBRTtJQUMzQixJQUFBLHVCQUFVLEVBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3BDLElBQUksSUFBSTtZQUFFLElBQUEsYUFBTSxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hCLENBQUMsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBSlcsUUFBQSxPQUFPLFdBSWxCIn0=