import {useRouter} from "next/router"
import {useState,useEffect} from "react"
import Sidebar from "../components/Sidebar"
import AuthGuard from "../components/AuthGuard"

export default function Edit(){

const router = useRouter()

const {id} = router.query

const [form,setForm]=useState({})

useEffect(()=>{

async function load(){

const r = await fetch("/api/transaction")
const data = await r.json()

const t = data.find(x=>x.id==id)

if(t) setForm(t)

}

if(id) load()

},[id])


function handle(e){

setForm({...form,[e.target.name]:e.target.value})

}


async function save(e){

e.preventDefault()

await fetch("/api/transaction",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
action:"edit",
...form
})

})

router.push("/transactions")

}

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Edit Transaction</h1>

<form className="form-card" onSubmit={save}>

<input name="name" value={form.name||""} onChange={handle}/>
<input name="bank" value={form.bank||""} onChange={handle}/>
<input name="account" value={form.account||""} onChange={handle}/>
<input name="amount" value={form.amount||""} onChange={handle}/>
<input name="notes" value={form.notes||""} onChange={handle}/>

<button className="btn-save">
Update
</button>

</form>

</div>

</div>

</AuthGuard>

)

}