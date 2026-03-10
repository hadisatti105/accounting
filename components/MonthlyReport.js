export default function MonthlyReport({transactions}){

const months={}

transactions.forEach(t=>{

const m=new Date(t.date).getMonth()+1

if(!months[m]) months[m]=0

const amount=Number(t.amount)

if(t.type==="Receive") months[m]+=amount
else months[m]-=amount

})

return(

<div>

<h2>Monthly Report</h2>

{Object.keys(months).map(m=>(

<p key={m}>

Month {m} : {months[m]}

</p>

))}

</div>

)

}