import Calendar, { type DayInfo } from "./Calendar";
import Time from "./Time";
import { in_array } from "./PTools";

//#region 日期倒计时
/**
 * 返回日期信息
 */
export interface DateCountdown_DayInfo {
    lYear: number;
    lMonth: number;
    lDay: number;
    lunarFestival: string | null;
    cYear: number;
    cMonth: number;
    cDay: number;
    festival: string | null;
    Term: string | null;
    diffDay: number;
}

/**
 * 自定义提醒
 */
export interface DateCountdown_CustomCountdown {
    name: string;
    month: number;
    day: number;
}

/**
 * 日期倒计时
 * @param festivals 通用节日名称(新历，农历，节气)
 * @param cFestivals 自定义日期(新历)
 * @param lFestivals 自定义日期(农历)
 * @returns 
 */
export const DateCountdown = (festivals: string[], cFestivals: DateCountdown_CustomCountdown[] = [], lFestivals: DateCountdown_CustomCountdown[] = []) => {
    let array: DateCountdown_DayInfo[] = [];
    let today = Time.getDayInfo();
    let time = new Date(`${today.Y}-${today.m}-${today.d} 00:00:00`).getTime();
    let calendar = new Calendar();
    let dayNum = 366;

    const getDayInfo = (y: DayInfo) => {
        // 农历节假日
        let lYear = y.lYear;
        let lMonth = y.lMonth;
        let lDay = y.lDay;
        let lunarFestival = y.lunarFestival;
        // 阳历节假日
        let cYear = y.cYear;
        let cMonth = y.cMonth;
        let cDay = y.cDay;
        let festival = y.festival;
        // 节气节假日
        let Term = y.Term;

        let diff = Time.getDifference(new Date(`${cYear}-${cMonth}-${cDay} 00:00:00`).getTime(), time);
        let diffDay = diff / 1000 / 24 / 60 / 60;
        return {
            lYear,
            lMonth,
            lDay,
            lunarFestival,
            cYear,
            cMonth,
            cDay,
            festival,
            Term,
            diffDay,
        };
    };

    for (let index = 0; index < dayNum; index++) {
        let _time = time + index * 60 * 60 * 24 * 1000;
        let day = Time.getDayInfo(_time);
        let dayInfo = calendar.solar2lunar(String(day.Y), String(day.m), String(day.d));
        if (dayInfo) {
            let x: DateCountdown_DayInfo[] = [];
            let y: DateCountdown_DayInfo[] = [];
            let z: DateCountdown_DayInfo[] = [];
            if (in_array(dayInfo.festival, festivals) || in_array(dayInfo.lunarFestival, festivals) || in_array(dayInfo.Term, festivals)) {
                x.push(getDayInfo(dayInfo));
            }
            for (let index = 0; index < cFestivals.length; index++) {
                const element = cFestivals[index];
                if (dayInfo.cMonth == element.month && dayInfo.cDay == element.day) {
                    let info = getDayInfo(dayInfo);
                    info.festival = element.name;
                    y.push(info);
                }
            }
            for (let index = 0; index < lFestivals.length; index++) {
                const element = lFestivals[index];
                if (dayInfo.lMonth == element.month && dayInfo.lDay == element.day) {
                    let info = getDayInfo(dayInfo);

                    info.lunarFestival = element.name;
                    z.push(info);
                }
            }
            if (x.length || y.length || z.length) {
                let info = getDayInfo(dayInfo);
                info.festival = "";
                info.lunarFestival = "";
                info.Term = "";
                for (let index = 0; index < x.length; index++) {
                    const element = x[index];
                    info.festival = info.festival == "" ?
                        element.festival == null ? "" : element.festival
                        : `${info.festival}、${element.festival}`;
                    info.lunarFestival = info.lunarFestival == "" ?
                        element.lunarFestival == null ? "" : element.lunarFestival
                        : `${info.lunarFestival}、${element.lunarFestival}`;
                    info.Term = info.Term == "" ?
                        element.Term == null ? "" : element.Term
                        : `${info.Term}、${element.Term}`;
                }
                for (let index = 0; index < y.length; index++) {
                    const element = y[index];
                    info.festival = info.festival == "" ? element.festival : `${info.festival}、${element.festival}`;
                }
                for (let index = 0; index < z.length; index++) {
                    const element = z[index];
                    info.lunarFestival = info.lunarFestival == "" ? element.lunarFestival : `${info.lunarFestival}、${element.lunarFestival}`;
                }

                array.push(info);
            }
        }
    }

    const checkArray = () => {
        let num = array.length - 1;
        if (num > 0) {
            if (array[0].festival == array[num].festival && array[0].lunarFestival == array[num].lunarFestival) {
                array.pop();
            }
        }
    };

    checkArray();
    return array;
};
//#endregion

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
};


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
};
