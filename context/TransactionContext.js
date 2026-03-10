import { createContext, useContext, useEffect, useState } from "react"

const TransactionContext = createContext()

export function TransactionProvider({children}){

const [transactions,setTransactions] = useState([])
const [loading,setLoading] = useState(true)

async function loadTransactions(){

try{

const r = await fetch("/api/transaction")
const data = await r.json()

setTransactions(data)
setLoading(false)

}catch(err){

console.log("LOAD ERROR",err)

}

}

useEffect(()=>{

loadTransactions()

},[])

return(

<TransactionContext.Provider value={{
transactions,
setTransactions,
loading,
reload:loadTransactions
}}>

{children}

</TransactionContext.Provider>

)

}

export function useTransactions(){

return useContext(TransactionContext)

}