const url = require('url')

const newRequest = (method, urlString, body) => {
    const u = url.parse(urlString)
    const req = {
        method,
        u,
        body
    }
    return req
}

module.exports = {
    newRequest
}
