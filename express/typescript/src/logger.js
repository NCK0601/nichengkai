"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = exports.develop = exports.usersLog = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const moment_1 = __importDefault(require("moment"));
const morgan_1 = __importDefault(require("morgan"));
const file_stream_rotator_1 = __importDefault(require("file-stream-rotator"));
const projectRoot = path_1.default.join(__dirname, '../../../../../');
const logsPath = path_1.default.join(projectRoot, './logs');
const errorPath = path_1.default.join(logsPath, './error');
const clientPath = path_1.default.join(logsPath, './client');
function getClientIp(req) {
    return req.headers['x-forwarded-for'] || req.socket.remoteAddress;
}
const getLogType = (statusCode) => {
    const code = Number.parseInt(statusCode.toString().charAt(0));
    if (code === 1 || code === 3)
        return 'INFO';
    if (code === 2)
        return 'SUCCESS';
    if (code === 4)
        return 'WARN';
    return 'ERROR';
};
const usersLog = (req, res, next) => {
    if (!fs_1.default.existsSync(clientPath))
        fs_1.default.mkdirSync(clientPath);
    const fileName = (0, moment_1.default)(new Date()).format('YYYY-MM-DD') + '.log';
    const filePath = path_1.default.join(clientPath, fileName);
    const time = (0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss');
    const code = res.statusCode;
    const type = getLogType(code);
    const protocol = req.protocol.toUpperCase();
    const method = req.method.toUpperCase();
    const url = req.url;
    const ip = getClientIp(req);
    const userAgent = req.headers['user-agent'];
    const log = `[${time}] [${type}] access - "${protocol} ${method} ${url}" ${code} "${ip}" "${userAgent}"\n`;
    try {
        fs_1.default.appendFileSync(filePath, log);
    }
    catch (e) {
        console.error(e);
    }
    next();
};
exports.usersLog = usersLog;
const dailyLogStream = file_stream_rotator_1.default.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path_1.default.join(errorPath, '%DATE%.log'),
    frequency: 'daily',
    verbose: false,
});
exports.develop = (0, morgan_1.default)('dev');
exports.production = (0, morgan_1.default)('combined', {
    stream: dailyLogStream,
    immediate: false,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vcmVzb3VyY2VzL3NyYy9sb2dnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QixvREFBNEI7QUFHNUIsb0RBQTRCO0FBRTVCLDhFQUFvRDtBQUdwRCxNQUFNLFdBQVcsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0FBQzVELE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sU0FBUyxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2pELE1BQU0sVUFBVSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBR25ELFNBQVMsV0FBVyxDQUFDLEdBQVk7SUFDaEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7QUFDbkUsQ0FBQztBQUVELE1BQU0sVUFBVSxHQUFHLENBQUMsVUFBa0IsRUFBVSxFQUFFO0lBQ2pELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQztRQUFFLE9BQU8sTUFBTSxDQUFDO0lBQzVDLElBQUksSUFBSSxLQUFLLENBQUM7UUFBRSxPQUFPLFNBQVMsQ0FBQztJQUNqQyxJQUFJLElBQUksS0FBSyxDQUFDO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFDOUIsT0FBTyxPQUFPLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUssTUFBTSxRQUFRLEdBQWUsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN2RixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7UUFBRSxZQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sUUFBUSxHQUFHLElBQUEsZ0JBQU0sRUFBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNsRSxNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNqRCxNQUFNLElBQUksR0FBRyxJQUFBLGdCQUFNLEVBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFDNUIsTUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0lBQ3BCLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLE1BQU0sR0FBRyxHQUFHLElBQUssSUFBSyxNQUFPLElBQUssZUFBZ0IsUUFBUyxJQUFLLE1BQU8sSUFBSyxHQUFJLEtBQU0sSUFBSyxLQUFNLEVBQUcsTUFBTyxTQUFVLEtBQUssQ0FBQztJQUMzSCxJQUFJO1FBQ0gsWUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDakM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDakI7SUFDRCxJQUFJLEVBQUUsQ0FBQztBQUNSLENBQUMsQ0FBQztBQW5CVyxRQUFBLFFBQVEsWUFtQm5CO0FBRUYsTUFBTSxjQUFjLEdBQUcsNkJBQWlCLENBQUMsU0FBUyxDQUFDO0lBQ2xELFdBQVcsRUFBRSxZQUFZO0lBQ3pCLFFBQVEsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUM7SUFDNUMsU0FBUyxFQUFFLE9BQU87SUFDbEIsT0FBTyxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUM7QUFFVSxRQUFBLE9BQU8sR0FBYSxJQUFBLGdCQUFNLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDbEMsUUFBQSxVQUFVLEdBQWEsSUFBQSxnQkFBTSxFQUFDLFVBQVUsRUFBRTtJQUN0RCxNQUFNLEVBQUUsY0FBYztJQUN0QixTQUFTLEVBQUUsS0FBSztDQUNoQixDQUFDLENBQUMifQ==