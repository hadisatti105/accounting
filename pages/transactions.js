import { useState } from "react"
import { useTransactions } from "../context/TransactionContext"
import Sidebar from "../components/Sidebar"
import AuthGuard from "../components/AuthGuard"
import Link from "next/link"

export default function Transactions(){

const { transactions, loading } = useTransactions()

const [search,setSearch] = useState("")
const [fromDate,setFromDate] = useState("")
const [toDate,setToDate] = useState("")

if(loading){
return(
<AuthGuard>
<div className="layout">
<Sidebar/>
<div className="main">
<h2>Loading transactions...</h2>
</div>
</div>
</AuthGuard>
)
}

const safeTransactions = Array.isArray(transactions) ? transactions : []

const filtered = safeTransactions.filter(t=>{

const nameMatch = String(t.name || "")
.toLowerCase()
.includes(search.toLowerCase())

const date = new Date(t.date)

const fromMatch = fromDate ? date >= new Date(fromDate) : true
const toMatch = toDate ? date <= new Date(toDate) : true

return nameMatch && fromMatch && toMatch

})

async function deleteTransaction(id){

if(!confirm("Delete this transaction?")) return

await fetch("/api/transaction",{
method:"DELETE",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({id})
})

location.reload()

}

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Transactions</h1>

<div className="filters">

<input
type="text"
placeholder="Search buyer..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<input
type="date"
value={fromDate}
onChange={(e)=>setFromDate(e.target.value)}
/>

<input
type="date"
value={toDate}
onChange={(e)=>setToDate(e.target.value)}
/>

</div>

<table className="table">

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
<button className="btn-edit">Edit</button>
</Link>

<button
className="btn-delete"
onClick={()=>deleteTransaction(t.id)}
>
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