// server.js
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')
const proxy = {
    '/api': {
        target: 'https://api-promptman.profzone.net',
        changeOrigin: true
    }
}

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        if (proxy) {
            Object.keys(proxy).forEach(function (context) {
                server.use(createProxyMiddleware(context, proxy[context]))
            })
        }

        server.all('*', (req, res) => handle(req, res))

        server.listen(port, err => {
            if (err) {
                throw err
            }
            console.log(`> Ready on http://localhost:${port}`)
        })
    })
    .catch(err => {
        console.log(err)
    })