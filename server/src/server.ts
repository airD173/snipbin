import fastify, {
  FastifyInstance as Instance,
  FastifyReply as Response,
  FastifyRequest as Request,
  FastifyServerOptions as Options,
} from 'fastify'
import cors from 'fastify-cors'
import AltairFastify from 'altair-fastify-plugin'

import shutdown from './plugins/shutdown.js'
import PrismaClient from './plugins/prisma.js'

import prisma from './database.js'

import telementry from '@autotelic/fastify-opentelemetry'

import consts from './constants.js'

import mercurius from 'mercurius'
import context, { Context } from './context.js'
import schema from './schema.js'

export const CreateServer = (options: Options = {}): Instance => {
  const server = fastify(options)

  server.register(cors)

  server.register(shutdown)
  server.register(telementry, {
    wrapRoutes: true,
    ignoreRoutes: consts,
    formatSpanName: (serviceName, request) =>
      `${request.url} - ${request.method}`,
  })

  server.register(PrismaClient)
  server.register(mercurius, {
    schema,
    path: '/graphql',
    graphiql: false,
    context: (req: Request, res: Response): Context => {
      return {
        prisma: prisma,
        req,
        res,
      }
    },
  })

  server.register(AltairFastify, {
    path: '/altair',
    baseURL: '/altair/',
    endpointURL: '/graphql',
    initialSettings: {
      theme: 'dark',
      'plugin.list': ['altair-graphql-plugin-graphql-explorer'],
    },
  })

  return server
}

export async function StartServer() {
  const server = CreateServer({
    logger: {
      level: 'info',
    },
    disableRequestLogging: process.env.ENABLE_REQUEST_LOGGING !== 'true',
  })

  try {
    const port = process.env.PORT ?? 3001
    await server.listen(port, '0.0.0.0', () => {
      console.log(`🎵 Listening on http://localhost:${port}`)
      console.log(`💻 Started GraphQL on http://localhost:${port}/graphql`)
      console.log(`🚀 Started Altair on http://localhost:${port}/altair`)
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
