import { useEffect } from "react"
import { useTransactions } from "../context/TransactionContext"
import Sidebar from "../components/Sidebar"
import AuthGuard from "../components/AuthGuard"
import FinanceChart from "../components/FinanceChart"

export default function Dashboard(){

const { transactions, loading, reload } = useTransactions()

useEffect(()=>{

const today = new Date()

const lastMonth = localStorage.getItem("lastMonthlyRefresh")

const currentMonth = today.getMonth()

if(lastMonth != currentMonth){

localStorage.setItem("lastMonthlyRefresh",currentMonth)

reload()

}

},[])

if(loading){
return(
<AuthGuard>
<div className="layout">
<Sidebar/>
<div className="main">
<h2>Loading dashboard...</h2>
</div>
</div>
</AuthGuard>
)
}

const safeTransactions = Array.isArray(transactions) ? transactions : []

let received = 0
let sent = 0

safeTransactions.forEach(t=>{

const amount = Number(t.amount)

if(t.type==="Receive") received += amount
if(t.type==="Send") sent += amount

})

const balance = received - sent

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Dashboard</h1>

<div className="cards">

<div className="card">
<h3>Received</h3>
<p>{received}</p>
</div>

<div className="card">
<h3>Sent</h3>
<p>{sent}</p>
</div>

<div className="card">
<h3>Balance</h3>
<p>{balance}</p>
</div>

</div>

<FinanceChart transactions={safeTransactions}/>

</div>

</div>

</AuthGuard>

)

}