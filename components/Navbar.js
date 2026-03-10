import Link from "next/link"

export default function Navbar(){

return(

<div style={{
display:"flex",
gap:"15px",
marginBottom:"30px"
}}>

<Link href="/dashboard">
<button className="btn-add">Dashboard</button>
</Link>

<Link href="/add-transaction">
<button className="btn-add">Add Transaction</button>
</Link>

</div>

)

}