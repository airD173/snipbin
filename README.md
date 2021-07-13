# SnipBin

A blazing fast, lightweight, elegant and open-source code pasting tool 

# 🚀 Quickstart 

Running website + development server locally

```
git clone https://github.com/harshhhdev/snip-bin.git
```

## Setting up the server

```bash
cd server

# Install deps
yarn
```

Now, rename `.env.Example` to `.env`

Input in your postgres connection string.

```env
DATABASE_URL = 'postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public'
```

## Setting up Prisma

Creating a Prisma schema

```bash
# prisma generate
yarn prisma gen
```

Migrations 

```bash
# prisma migrate dev --name init
yarn prisma migrate
```

## Starting server

```bash
# snip-bin/server
# watch the TypeScript files, and build to /dist
yarn watch

# Use Nodemon and run the JavaScript files in /dist
yarn dev

# NOTE: Post GraphQL requests to /graphql, not /altair
https://localhost:3001
https://localhost:3001/graphql
https://localhost:3001/altair
```

## Setting up client

```bash
cd client

# Install deps
yarn
```

Start the [development server](http://localhost:3000/)

```bash
# next dev
yarn dev
```

# 🔧 Tools Used

 - [GraphQL](https://graphql.org/)
 - [Fastify](https://www.fastify.io/)
 - [TypeScript](https://www.typescriptlang.org/)
 - [Prisma](https://www.prisma.io/)
 - [Altair](https://altair.sirmuel.design/)
 - [Mercurius](https://mercurius.dev/)
 - [Node.js](https://nodejs.org/)
 - [Next.js](https://nextjs.org/)
 - [URQL](https://formidable.com/open-source/urql/)
 - [Prettier](https://prettier.io/)
 - [ESLint](https://eslint.org/)
 - [CodeMirror](https://codemirror.net/)

# 🤞 Contributing

After setting up the project, and making changes:

```git
git add .
git commit -m "commit message"
git push YOUR_REPO_URL YOUR_BRANCH
```
