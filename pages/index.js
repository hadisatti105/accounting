import {useState} from "react"
import {useRouter} from "next/router"

export default function Login(){

const router = useRouter()

const [username,setUsername]=useState("")
const [password,setPassword]=useState("")

function login(e){

e.preventDefault()

if(
(username==="Sami" && password==="1234") ||
(username==="Abdullah" && password==="1234") ||
(username==="AbdulHadi" && password==="1234")
){

localStorage.setItem("user",username)

router.push("/dashboard")

}else{

alert("Invalid Login")

}

}

return(

<div className="login-container">

<form className="login-card" onSubmit={login}>

<h2>Accounting Login</h2>

<input
placeholder="Username"
value={username}
onChange={e=>setUsername(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={e=>setPassword(e.target.value)}
/>

<button>Login</button>

</form>

</div>

)

}