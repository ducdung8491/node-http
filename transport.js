const http = require('http')
const https = require('https')

class Transport {
    constructor() { }

    send(req) {
        const options = {
            method: req.method,
            hostname: req.url.hostname,
            port: req.url.port,
            path: req.url.path,
            headers: req.headers
        }
        return new Promise((resolve, reject) => {
            const ireq = (req.url.protocol == 'https' ? https : http).request(options, (res) => {
                let body = []
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    body.push(chunk)
                });
                res.on('end', () => {
                    let payload = JSON.parse(body.join(''))
                    resolve({
                        statusCode: req.statusCode,
                        headers: req.getHeaders(),
                        body: payload
                    })
                });
            }).on('error', (e) => {
                reject(`problem with request: ${e.message}`);
            });
            ireq.setTimeout(3000, () => {
                ireq.abort()
            })
            let data = typeof req.body == 'string' ? req.body : JSON.stringify(req.body)
            ireq.write(data)
            ireq.end()
        })
    }
}

const defaultTransport = new Transport()

modules.export = {
    Transport,
    defaultTransport
}
