import '../styles/globals.css'
import { StateContext } from '../context/StateContext'
import Layout from '../component/Layout/Layout'
import { useRouter } from 'next/router'
import {client} from '../Utils/sanityClient'
 

function MyApp({ Component, pageProps}) {
  const router = useRouter()

    return (
      <StateContext>
        <Layout>
            <Component key={router.asPath}  {...pageProps} />
        </Layout>
      </StateContext>
    )
  }

export default MyApp