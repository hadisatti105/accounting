import { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function AuthGuard({children}){

const router = useRouter()
const [loading,setLoading] = useState(true)

useEffect(()=>{

const user = localStorage.getItem("user")

if(!user){
router.replace("/")
}else{
setLoading(false)
}

},[])

if(loading){
return <div style={{padding:"40px"}}>Checking login...</div>
}

return children

}