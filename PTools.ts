// 与php功能函数相似的函数

export const in_array = (value: any, array: any) => {
    for (let val in array) {
        if (value == array[val]) {
            return true;
        }
    }
    return false;
};
