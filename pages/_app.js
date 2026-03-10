import "../styles/globals.css"
import "../styles/dashboard.css"

import { TransactionProvider } from "../context/TransactionContext"

export default function MyApp({ Component, pageProps }) {

return(

<TransactionProvider>

<Component {...pageProps} />

</TransactionProvider>

)

}