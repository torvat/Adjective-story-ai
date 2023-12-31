This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Adjective-story-ai

DAT158 Assingment-2: Project for creating an ai to generate adjective stories.

The report can be found here: [Rapport Oblig 2 ML.pdf](Rapport%20Oblig%202%20ML.pdf)

The project is deployed on Vercel: [https://adjective-story-ai.vercel.app/](https://adjective-story-ai.vercel.app/)

## OpenAI API

This project uses the [OpenAI API](https://beta.openai.com/docs/introduction) to generate text.

## Environment Variables

Add the following to a `.env.local` file in the root of the project:

```dotenv
OPENAI_API_KEY= # Your OpenAI API key
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Prettier

Before doing changes add:

{
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnSave": true
}

to settings.json to make sure the files are formated correctly

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
