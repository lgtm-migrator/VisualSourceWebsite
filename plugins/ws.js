'use strict'

const fp = require('fastify-plugin')

module.exports = fp((fastify, opts, next) => {
  const WebSocketServer = require('ws').Server
  const wss = new WebSocketServer({
    server: fastify.server,
    path: "/polytopia",
    clientTracking: true
  })

  fastify.decorate('ws', wss)

  fastify.addHook('onClose', (fastify, done) => fastify.ws.close(done))

  next()
}, {
  fastify: '1.7.0 - 2',
  name: 'fastify-ws'
})