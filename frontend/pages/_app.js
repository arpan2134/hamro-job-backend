import '@/styles/globals.css'

import { Authprovider } from '@/context/AuthContext'

export default function App({ Component, pageProps }) {
  return (

    <Authprovider>
  <Component {...pageProps} />
  </Authprovider>
  )
}
