import { Request, Response, NextFunction } from 'express';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type Route = {
	path: string;
	method: HttpMethod,
	fn: Function
	methodName: string
}

export type Middleware = (req: Request, res: Response, next: NextFunction) => any;

export type LoggerMode = 'dev' | 'develop' | 'pro' | 'production';

export type WeekType = '1' | '2' | '3' | '4' | '5' | '6' | '7';

export type MonthType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' |
	'10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' |
	'21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31';

export type TaskTime = {
	delay: number,
	loop: number
}
