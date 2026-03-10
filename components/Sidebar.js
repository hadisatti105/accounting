import Link from "next/link"
import { useRouter } from "next/router"

export default function Sidebar(){

const router = useRouter()

function logout(){

localStorage.removeItem("user")

router.push("/")

}

return(

<div className="sidebar">

<h2>Accounting</h2>

<Link href="/dashboard">Dashboard</Link>

<Link href="/add-transaction">Add Transaction</Link>

<Link href="/transactions">Transactions</Link>

<Link href="/partners">Partner Analytics</Link>

<Link href="/banks">Bank Analytics</Link>

<Link href="/reports">Monthly Reports</Link>

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

)

}