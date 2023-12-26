## Introduction
Then, install the dependencies with:

```bash
npm i
npm run dev
```

### Frameworks

- [Next.js](https://nextjs.org/) – React framework for building performant apps with the best developer experience
- [Auth.js](https://authjs.dev/) – Handle user authentication with ease with providers like Google, Twitter, GitHub, etc.
- [Prisma](https://www.prisma.io/) – Typescript-first ORM for Node.js
- 
### Code Quality

- [TypeScript](https://www.typescriptlang.org/) – Static type checker for end-to-end typesafety
- [Prettier](https://prettier.io/) – Opinionated code formatter for consistent code style
- [ESLint](https://eslint.org/) – Pluggable linter for Next.js and TypeScript



### Create Database
- docker network create frontend
- Docker-compose up postgres 
- npx prisma generate
- npx prisma db push
- npx prisma studio

### .env file
 DATABASE_URL="postgresql://username:passwd@host:5432/postgres?schema=public&connect_timeout=300&sslaccept=strict"


