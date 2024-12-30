// 与php功能函数相似的函数

export const in_array = <T>(value: T, array: T[]) => {
    for (let val in array) {
        if (value == array[val]) {
            return true;
        }
    }
    return false;
};
