const Transport = require('./transport')
const Client = require('./client')

const defaultTransport = new Transport()
const defaultClient = new Client(defaultTransport)

const get = (url) => {
    return defaultClient.get(url)
}

const post = (url, contenType, body) => {
    return defaultClient.post(url, contenType, body)
}

module.exports = {
    defaultClient,
    get,
    post
}
