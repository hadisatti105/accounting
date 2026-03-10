import { useState } from "react"
import { useRouter } from "next/router"
import Sidebar from "../components/Sidebar"
import AuthGuard from "../components/AuthGuard"

export default function AddTransaction(){

const router = useRouter()

const [form,setForm] = useState({
partner:"",
type:"",
name:"",
bank:"",
account:"",
amount:"",
notes:""
})

function handle(e){

const {name,value} = e.target

setForm(prev=>({
...prev,
[name]:value
}))

}

async function submit(e){

e.preventDefault()

// validation
if(!form.partner || !form.type || !form.amount){

alert("Partner, Type and Amount are required")

return

}

await fetch("/api/transaction",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
partner:form.partner,
type:form.type,
name:form.name,
bank:form.bank,
account:form.account,
amount:form.amount,
notes:form.notes
})

})

router.push("/transactions")

}

return(

<AuthGuard>

<div className="layout">

<Sidebar/>

<div className="main">

<h1>Add Transaction</h1>

<form className="form-card" onSubmit={submit}>

<label>Partner</label>
<select name="partner" value={form.partner} onChange={handle} required>

<option value="">Select Partner</option>
<option value="Sami">Sami</option>
<option value="Abdullah">Abdullah</option>
<option value="Abdul Hadi">Abdul Hadi</option>

</select>

<label>Type</label>
<select name="type" value={form.type} onChange={handle} required>

<option value="">Select Type</option>
<option value="Receive">Receive</option>
<option value="Send">Send</option>

</select>

<label>Name</label>
<input name="name" value={form.name} onChange={handle}/>

<label>Bank</label>
<input name="bank" value={form.bank} onChange={handle}/>

<label>Account</label>
<input name="account" value={form.account} onChange={handle}/>

<label>Amount</label>
<input type="number" name="amount" value={form.amount} onChange={handle} required/>

<label>Notes</label>
<input name="notes" value={form.notes} onChange={handle}/>

<button className="btn-save">Save Transaction</button>

</form>

</div>

</div>

</AuthGuard>

)

}