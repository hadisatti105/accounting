export default function PartnerCards({transactions}){

const partners={
"Sami":0,
"Abdullah":0,
"Abdul Hadi":0
}

transactions.forEach(t=>{

const amount=Number(t.amount)

if(t.type==="Receive") partners[t.partner]+=amount
else partners[t.partner]-=amount

})

return(

<div className="cards">

{Object.keys(partners).map(p=>(

<div className="card" key={p}>

<h4>{p} Balance</h4>

<p>{partners[p]}</p>

</div>

))}

</div>

)

}