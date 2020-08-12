const { newRequest } = require("./request")
const { defaultTransport } = require('./transport')

class Client {
    constructor(transport) {
        this.transport = transport
    }

    get(url) {
        const req = newRequest('GET', url, null)
        return this.do(req)
    }

    post(url, contenType, body) {
        const req = newRequest('POST', url, body)
        req.headers = {
            ...req.headers,
            'Content-Type': contenType
        }
        return this.do(req)
    }

    do(req) {
        return this.transport.send(req)
    }
}

const defaultClient = new Client(defaultTransport)

const get = (url) => {
    return defaultClient.get(url)
}

const post = (url, contenType, body) => {
    return defaultClient.post(url, contenType, body)
}

module.exports = {
    Client,
    defaultClient,
    get,
    post
}