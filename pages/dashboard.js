import {useEffect,useState} from "react"
import AuthGuard from "../components/AuthGuard"
import Sidebar from "../components/Sidebar"

export default function Dashboard(){

const [transactions,setTransactions]=useState([])

async function load(){

const r = await fetch("/api/transaction")
const data = await r.json()

setTransactions(data)

}

useEffect(()=>{
load()
},[])

let receive = 0
let send = 0

transactions.forEach(t=>{
if(t.type==="Receive") receive+=Number(t.amount)
if(t.type==="Send") send+=Number(t.amount)
})

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Dashboard</h1>

<div className="cards">

<div className="card">

<h4>Total Received</h4>

<p>{receive}</p>

</div>

<div className="card">

<h4>Total Sent</h4>

<p>{send}</p>

</div>

<div className="card">

<h4>Balance</h4>

<p>{receive-send}</p>

</div>

</div>

</div>

</div>

</AuthGuard>

)

}