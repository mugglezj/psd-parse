// todo useless
import File from './file'

export default class LazyExecute {
    obj:object = {}
    file: File
    startPos: number
    loaded: boolean = false
    loadMethod: string = null
    loadArgs = []
    passthru = []

    constructor(obj, file) {
        this.obj = obj
        this.file = file
        this.startPos = this.file.tell()
    }

    now(method, ...args) {
        this.obj[method].apply(this.obj, args)
        return this
    }

    later(method, ...args) {
        this.loadMethod = method
        this.loadArgs = args
        return this
    }

    ignore(...args) {
        this.passthru.concat(args)
        return this
    }

    get() {
        for (let key in this.obj) {
            console.log(key)
            if (this[key]) continue
            Object.defineProperty(this, key, {
                    get: () => {
                        if (!this.loaded && this.passthru.indexOf(key) === -1)
                            this.load()
                        return this.obj[key]
                    }
                }
            )
        }
        return this
    }

    load() {
        let origPos = this.file.tell()
        this.file.seek(this.startPos)
        this.obj[this.loadMethod].apply(this.obj, this.loadArgs)
        this.file.seek(origPos)
        this.loaded = true
    }
}