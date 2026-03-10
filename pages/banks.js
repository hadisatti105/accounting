import {useEffect,useState} from "react"
import AuthGuard from "../components/AuthGuard"
import Sidebar from "../components/Sidebar"

export default function Banks(){

const [transactions,setTransactions]=useState([])

useEffect(()=>{

async function load(){

const r = await fetch("/api/transaction")
const data = await r.json()

setTransactions(data)

}

load()

},[])

const banks={}

transactions.forEach(t=>{

if(!banks[t.bank]) banks[t.bank]=0

const amount=Number(t.amount)

if(t.type==="Receive") banks[t.bank]+=amount
else banks[t.bank]-=amount

})

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Bank Analytics</h1>

<div className="cards">

{Object.keys(banks).map(b=>(

<div className="card" key={b}>

<h3>{b}</h3>

<p>{banks[b]}</p>

</div>

))}

</div>

</div>

</div>

</AuthGuard>

)

}