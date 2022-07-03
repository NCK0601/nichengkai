export const notEmpty = (...str: string[]): boolean => str.some(item => Boolean(item && item != ''));
