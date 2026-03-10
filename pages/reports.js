import {useEffect,useState} from "react"
import AuthGuard from "../components/AuthGuard"
import Sidebar from "../components/Sidebar"

export default function Reports(){

const [transactions,setTransactions]=useState([])

useEffect(()=>{

async function load(){

const r = await fetch("/api/transaction")
const data = await r.json()

setTransactions(data)

}

load()

},[])

const months={}

transactions.forEach(t=>{

const month = new Date(t.date).getMonth()+1

if(!months[month]) months[month]=0

const amount=Number(t.amount)

if(t.type==="Receive") months[month]+=amount
else months[month]-=amount

})

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Monthly Reports</h1>

<div className="cards">

{Object.keys(months).map(m=>(

<div className="card" key={m}>

<h3>Month {m}</h3>

<p>{months[m]}</p>

</div>

))}

</div>

</div>

</div>

</AuthGuard>

)

}