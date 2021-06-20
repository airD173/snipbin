import prisma from './database.js'
import { PrismaClient } from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'

export interface Context {
  req: FastifyRequest
  res: FastifyReply
  prisma: PrismaClient
}

const context = ({ req, res }: { req: FastifyRequest; res: FastifyReply }) => {
  return { req, res, prisma }
}

export default context
