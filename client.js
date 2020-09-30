const { newRequest } = require("./request")

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

module.exports = Client