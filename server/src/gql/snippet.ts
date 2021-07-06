import { Prisma, snippets } from '.prisma/client'
import Nexus, { FieldResolver } from 'nexus'
import { OutputScalarConfig } from 'nexus/dist/core'
import { Context } from '../context'

async function FetchUserByID(ctx: Context, id: string) {
  return ctx.prisma.snippets.findUnique({
    where: { id: id },
  })
}

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
type Snip = ThenArg<ReturnType<typeof FetchUserByID>>

export const Snippet = Nexus.objectType({
  name: 'snippet',
  definition(t) {
    t.string('id')
    t.string('title')
    t.string('code')
    t.string('language')
  },
})

export const SnippetQuery = Nexus.queryType({
  definition(t) {
    t.nullable.field('findSnippet', {
      type: 'snippet',
      args: {
        id: Nexus.nonNull(Nexus.stringArg()),
      },
      resolve(_parent, _args, ctx) {
        return ctx.prisma.snippets.findUnique({
          where: {
            id: _args.id,
          },
        })
      },
    })
  },
})

export const SnippetMutation = Nexus.extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createSnippet', {
      type: 'snippet',
      args: {
        id: Nexus.nonNull(Nexus.stringArg()),
        title: Nexus.nonNull(Nexus.stringArg()),
        code: Nexus.nonNull(Nexus.stringArg()),
        language: Nexus.nonNull(Nexus.stringArg()),
      },
      resolve(_parent, _args, ctx) {
        return ctx.prisma.snippets.create({
          data: {
            id: _args.id,
            title: _args.title,
            code: _args.code,
            language: _args.language,
          },
        })
      },
    })
  },
})
