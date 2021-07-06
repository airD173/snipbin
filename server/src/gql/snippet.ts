import Nexus from 'nexus'

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
