const isRoutePath = (path: string): string => {
	if (path.charAt(0) !== '/') {
		path = '/' + path;
	}
	if (path.charAt(path.length - 1) === '/') {
		path = path.substr(0, path.length - 1);
	}
	return path;
};

export function resolve(...paths: string[]): string {
	let res: string = '';
	for (let i = 0; i < paths.length; i++) {
		res += isRoutePath(paths[i]);
	}
	return res;
}
