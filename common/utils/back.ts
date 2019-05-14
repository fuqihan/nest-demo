import { CODE } from '../enum/index';

class _Back {
    constructor() {}

    success(data: any, message = '') {
        return {
            code: CODE.SUCCESS,
            data,
            message
        }
    }

    error(data: any, message = '') {
        return {
            code: CODE.ERROR,
            data,
            message
        }
    }
}

export const Back =  new _Back();