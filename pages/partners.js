import {useEffect,useState} from "react"
import AuthGuard from "../components/AuthGuard"
import Sidebar from "../components/Sidebar"

export default function Partners(){

const [transactions,setTransactions]=useState([])

useEffect(()=>{

async function load(){

const r = await fetch("/api/transaction")
const data = await r.json()

setTransactions(data)

}

load()

},[])

const partners={
"Sami":0,
"Abdullah":0,
"Abdul Hadi":0
}

transactions.forEach(t=>{

const amount = Number(t.amount)

if(t.type==="Receive"){
partners[t.partner]+=amount
}else{
partners[t.partner]-=amount
}

})

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Partner Analytics</h1>

<div className="cards">

{Object.keys(partners).map(p=>(

<div className="card" key={p}>

<h3>{p}</h3>

<p>{partners[p]}</p>

</div>

))}

</div>

</div>

</div>

</AuthGuard>

)

}