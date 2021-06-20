import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'

import pkg from '@prisma/client'
const { PrismaClient } = pkg

declare module 'fastify' {
  interface FastifyInstance {
    prisma: typeof PrismaClient
  }
}

const prisma: FastifyPluginAsync = fp(async (server, options) => {
  const prisma = new PrismaClient({
    log: ['error', 'warn'],
  })

  await prisma.$connect()

  server.decorate('prisma', prisma)

  // // Middleware function to track db query performance
  // prisma.$use(async (params, next) => {
  //   const result = await next(params)
  //   return result
  // })
})

export default prisma
