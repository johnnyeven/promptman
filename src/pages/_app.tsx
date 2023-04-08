import '@/styles/globals.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="PromptMan.io is a tool specifically designed for hobbyists writing StableDiffusion Prompt. You can easily view, share, and run these prompts with one click, while providing a prompt design tool that allows you to easily create a prompt that meets your needs and share it with others." />
                <meta name="keywords" content="prompt, stable diffusion, promptman, promptman.io" />
                <meta name="author" content="Johnny Even" />
                <meta property="og:title" content="PromptMan.io" />
                <meta property="og:description" content="PromptMan.io is a tool specifically designed for hobbyists writing StableDiffusion Prompt. You can easily view, share, and run these prompts with one click, while providing a prompt design tool that allows you to easily create a prompt that meets your needs and share it with others." />
                <meta property="og:url" content="https://promptman.vercel.app/" />
                <meta property="og:site_name" content="PromptMan.io" />
                <meta property="og:type" content="website" />
                <title>{'PromptMan.io'}</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
