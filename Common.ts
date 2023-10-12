/**
 * 深拷贝函数
 * 
 * @param target 
 * @returns 
 */
export const deepCopy = <T>(target: T): T => {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime()) as any;
    }
    if (target instanceof Array) {
        const cp = [] as any[];
        (target as any[]).forEach((v) => { cp.push(v); });
        return cp.map((n: any) => deepCopy<any>(n)) as any;
    }
    if (typeof target === 'object') {
        const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
        Object.keys(cp).forEach(k => {
            cp[k] = deepCopy<any>(cp[k]);
        });
        return cp as T;
    }
    return target;
};

/**
 * 睡眠函数
 * 
 * @param time microtime
 * @returns 
 */
export const sleep = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('');
        }, time);
    });
}

/**
 * 使用`await`等待异步函数时，如果异步函数内发生异常则将会被捕获错误并返回（与`golang`相似）
 * 
 * @param { Promise } promise
 * @return { Promise }
 */
export const go = async <T, Error>(promise: Promise<T>): Promise<[Error, undefined] | [null, T]> => {
    try {
        const data = await promise;
        const result: [null, T] = [null, data];
        return result;
    } catch (err: any) {
        const result_1: [Error, undefined] = [err, undefined];
        return result_1;
    }
}