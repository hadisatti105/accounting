import {useEffect,useState} from "react"
import Link from "next/link"
import AuthGuard from "../components/AuthGuard"
import Sidebar from "../components/Sidebar"

export default function Transactions(){

const [transactions,setTransactions]=useState([])
const [search,setSearch]=useState("")

async function load(){

const r = await fetch("/api/transaction")
const data = await r.json()

setTransactions(data)

}

useEffect(()=>{
load()
},[])

async function deleteTransaction(id){

await fetch("/api/transaction",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"delete",
id
})
})

load()

}

const filtered = (Array.isArray(transactions) ? transactions : []).filter(t =>

String(t.name || "")
.toLowerCase()
.includes(search.toLowerCase())

)

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Transactions</h1>

<input
placeholder="Search buyer"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<table>

<thead>

<tr>

<th>Date</th>
<th>Partner</th>
<th>Type</th>
<th>Name</th>
<th>Bank</th>
<th>Account</th>
<th>Amount</th>
<th>Notes</th>
<th>Action</th>

</tr>

</thead>

<tbody>

{filtered.map(t=>(

<tr key={t.id}>

<td>{t.date}</td>
<td>{t.partner}</td>
<td>{t.type}</td>
<td>{t.name}</td>
<td>{t.bank}</td>
<td>{t.account}</td>
<td>{t.amount}</td>
<td>{t.notes}</td>

<td>

<Link href={`/edit-transaction?id=${t.id}`}>
<button>Edit</button>
</Link>

<button onClick={()=>deleteTransaction(t.id)}>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

</AuthGuard>

)

}