"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getControllers = void 0;
const path_1 = __importDefault(require("path"));
const requireAll_1 = require("./utils/requireAll");
const decorator_1 = require("./decorator");
const projectRoot = path_1.default.join(__dirname, '../../../../../');
const controllerPath = path_1.default.join(projectRoot, './src/controller');
function getControllers() {
    let controllers = [];
    (0, requireAll_1.requireAll)(controllerPath).forEach(controller => {
        controllers.push(...(0, decorator_1.parseDecorators)(controller));
    });
    return controllers;
}
exports.getControllers = getControllers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcmVzb3VyY2VzL3NyYy9yb3V0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQXdCO0FBRXhCLG1EQUFnRDtBQUNoRCwyQ0FBOEM7QUFFOUMsTUFBTSxXQUFXLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUM1RCxNQUFNLGNBQWMsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0FBRWxFLFNBQWdCLGNBQWM7SUFDN0IsSUFBSSxXQUFXLEdBQVksRUFBRSxDQUFDO0lBQzlCLElBQUEsdUJBQVUsRUFBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDL0MsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEsMkJBQWUsRUFBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxXQUFXLENBQUM7QUFDcEIsQ0FBQztBQU5ELHdDQU1DIn0=