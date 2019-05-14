export const mongoUrl = '';

export const grpcServe = {
    user: {
        url: 'localhost:50051',
        port: '50051',
        package: 'user',
    },
    history: {
        url: 'localhost:50050',
        port: '50053',
        package: 'history'
    },
    company: {
        url: 'localhost:50048',
        port: '50049',
        package: 'company'
    }
}

export const tokenConfig = {
    key: 'daka',
    expireTime: 3600
}

export const MONGO_NAME = {
    COMPANY: 'company',
    USER: 'user',
    HISTORY: 'history'
}