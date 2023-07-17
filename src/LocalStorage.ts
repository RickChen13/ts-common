class LocalStorage {
    /**
     * 设置LocalStorage
     *
     * @param cname
     * @param cvalue
     */
    static setLocalStorage(cname: string, cvalue: string): boolean {
        let result = true;
        try {
            localStorage.setItem(cname, cvalue);
        } catch (error) {
            result = false;
        }
        return result;
    }

    /**
     * 获取LocalStorage
     *
     * @param cname
     */
    static getLocalStorage(cname: string): string | null {
        return localStorage.getItem(cname);
    }
}

export default LocalStorage;
