import { useState } from "react";
import { useRouter } from "next/router";

export default function Login(){

const router = useRouter()

const [username,setUsername] = useState("")
const [password,setPassword] = useState("")

const login = () => {

const users = {
  sami:"1234",
  abdullah:"1234",
  abdulhadi:"1234"
}

if(users[username] === password){

localStorage.setItem("user",username)

router.push("/dashboard")

}else{

alert("Invalid Login")

}

}

return(

<div style={{padding:40}}>

<h1>Partner Login</h1>

<input
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={login}>Login</button>

</div>

)

}