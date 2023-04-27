import '@/styles/globals.css'


import { Authprovider } from '@/context/AuthContext'

import { JobProvider } from '@/context/JobContext'

export default function App({ Component, pageProps }) {
  return (

    <Authprovider>
      <JobProvider>
  <Component {...pageProps} />
  </JobProvider>
  </Authprovider>
  )
}
