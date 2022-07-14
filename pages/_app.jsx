import 'generalStyles/normalize.css'
import 'generalStyles/storePersonalization.css'
import Head from 'next/head'
import DataProvider from "../provider"
import Script from 'next/script'

function MyApp({ Component, pageProps }) {

  

  return (
    <DataProvider>
      <Head>
      <meta charSet="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
    <meta name="description" content="Catálogo"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap" rel="stylesheet"/> 
    <meta name="theme-color" content="var(--color1)"/>
    <meta name="msapplication-navbutton-color" content="var(--color1)"/>
      </Head>
      <Script src="https://kit.fontawesome.com/87e51fd4dd.js" crossOrigin="anonymous"></Script>
      <Component {...pageProps}/>
    </DataProvider>
  )
}

export default MyApp
