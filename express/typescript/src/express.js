"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBasicExpress = void 0;
const logger_1 = require("./logger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const projectRoot = path_1.default.join(__dirname, '../../../../../');
const logsPath = path_1.default.join(projectRoot, './logs');
function getBasicExpress() {
    if (!fs_1.default.existsSync(logsPath))
        fs_1.default.mkdirSync(logsPath);
    const app = (0, express_1.default)();
    app.use(logger_1.usersLog);
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    return app;
}
exports.getBasicExpress = getBasicExpress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3Jlc291cmNlcy9zcmMvZXhwcmVzcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxQ0FBb0M7QUFDcEMsa0VBQXlDO0FBQ3pDLHNEQUE4QztBQUM5Qyw0Q0FBb0I7QUFDcEIsZ0RBQXdCO0FBRXhCLE1BQU0sV0FBVyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7QUFDNUQsTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFbEQsU0FBZ0IsZUFBZTtJQUM5QixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUM7UUFBRSxZQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sR0FBRyxHQUFHLElBQUEsaUJBQVUsR0FBRSxDQUFDO0lBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQVEsQ0FBQyxDQUFDO0lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBQSx1QkFBWSxHQUFFLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRCxPQUFPLEdBQUcsQ0FBQztBQUNaLENBQUM7QUFSRCwwQ0FRQyJ9