This is a [Studihub Web](https://google.com/) project

## Prerequisite
- NodeJS version: refer to `.nvmrc` file
- Install packages: `pnpm install --frozen-lockfile`
- Clone file `.env.example` to `.env.local` for local running.

## Dev mode
First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Production mode

Run the command to build project: 

```bash
pnpm build
```

If you built with standalone mode, start app with the command:
```bash
cd ./.next/standalone && node server.js 
```

Otherwise, running start normally:
```bash
pnpm start 
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
