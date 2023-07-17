import Calendar from "@/Calendar";
import { deepCopy } from "@/Common";

//#region 日历信息转换
function calendar_test() {
    const calendar = new Calendar();
    let str = calendar.lunar2solar(2023, 2, 1, true);
    console.log("str", str);
}
//#endregion

//#region 深拷贝
function deepCopy_test() {
    let obj = {
        name: "rick",
        age: 18,
        list: [1, 2, 3, "x"],
        func: function () {
            console.log(`hello my name is ${this.name}`);
        }
    }
    let obj1 = deepCopy(obj);
    let obj2 = obj;
    obj.list[0] = 0;

    console.log('obj', obj);
    console.log('obj1', obj1);
    console.log('obj2', obj2);
}
deepCopy_test();
//#endregion