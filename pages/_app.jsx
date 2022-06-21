import './styles/global.css'
import Head from 'next/head'
import DataProvider from "../provider"
import Script from 'next/script'

function MyApp({ Component, pageProps }) {

  

  return (
    <DataProvider>
      <Head>
      <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.png" />
    <meta name="description" content="Web site created using create-react-app"/>
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200&display=swap" rel="stylesheet"/> 
    <meta name="theme-color" content="#3662DB"/>
    <meta name="msapplication-navbutton-color" content="#3662DB"/>
      </Head>
      <Script src="https://kit.fontawesome.com/87e51fd4dd.js" crossOrigin></Script>
      <Component {...pageProps}/>
    </DataProvider>
  )
}

export default MyApp
