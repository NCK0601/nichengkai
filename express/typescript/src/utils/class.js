"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMethodsFromClass = void 0;
const isConstructor = (val) => val === 'constructor';
const isFunction = (val) => typeof val === 'function';
function getMethodsFromClass(instance) {
    const prototype = Object.getPrototypeOf(instance);
    const methodNames = Object.getOwnPropertyNames(prototype)
        .filter(item => !isConstructor(item) && isFunction(prototype[item]));
    const res = {};
    methodNames.forEach(methodName => {
        res[methodName] = prototype[methodName];
    });
    return res;
}
exports.getMethodsFromClass = getMethodsFromClass;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9yZXNvdXJjZXMvc3JjL3V0aWxzL2NsYXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBUSxFQUFXLEVBQUUsQ0FBQyxHQUFHLEtBQUssYUFBYSxDQUFDO0FBQ25FLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBUSxFQUFXLEVBQUUsQ0FBQyxPQUFPLEdBQUcsS0FBSyxVQUFVLENBQUM7QUFFcEUsU0FBZ0IsbUJBQW1CLENBQUMsUUFBZ0I7SUFDbkQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxNQUFNLFdBQVcsR0FBYSxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1NBQ2pFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLE1BQU0sR0FBRyxHQUFXLEVBQUUsQ0FBQztJQUN2QixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBRWhDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUM7QUFWRCxrREFVQyJ9