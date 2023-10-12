

class WaitGroup {
    #taskNum: number;
    #_resolve: any = null;
    #resolve: (value: unknown) => void | null = this.#_resolve;

    #check() {
        if (this.#taskNum == 0) {
            if (typeof (this.#resolve) == "function") {
                this.#resolve(this.#taskNum);
            }
        }
    }

    constructor(taskNum: number = 0) {
        if (taskNum < 0) {
            taskNum = 0;
        }
        this.#taskNum = taskNum;
    }

    add(taskNum: number = 1) {
        if (taskNum >= 1) {
            this.#taskNum += taskNum;
        }
    }

    done() {
        if (this.#taskNum >= 1) {
            this.#taskNum -= 1;
        }
        this.#check();
    }

    wait() {
        return new Promise((resolve) => {
            this.#resolve = resolve;
            this.#check();
        });
    }
}

export default WaitGroup;