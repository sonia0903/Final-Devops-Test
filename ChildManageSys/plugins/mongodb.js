const fp = require('fastify-plugin')

const { MONGO_HOSTNAME, MONGO_USERNAME, MONGO_PASSWORD } = process.env

module.exports = fp(async function (fastify, opts) {
  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:33307/?authMechanism=DEFAULT`

  fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: url
  })
})