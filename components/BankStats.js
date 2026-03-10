export default function BankStats({transactions}){

const banks={}

transactions.forEach(t=>{

const amount=Number(t.amount)

if(!banks[t.bank]) banks[t.bank]=0

if(t.type==="Receive") banks[t.bank]+=amount
else banks[t.bank]-=amount

})

return(

<div>

<h3>Bank Balances</h3>

{Object.keys(banks).map(b=>(

<p key={b}>
{b} : {banks[b]}
</p>

))}

</div>

)

}