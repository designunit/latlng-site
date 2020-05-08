import Head from 'next/head'
import { AppType } from 'next/dist/next-server/lib/utils'
const App: AppType = props => {
    const { Component, pageProps } = props

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, maximum-scale=1.0" />
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default App
