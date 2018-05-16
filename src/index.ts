import * as fs from "fs";
import PSD from './psd'
class Index {
    static fromFile(file) {
        return new PSD(fs.readFileSync(file))
    }
}

export = Index