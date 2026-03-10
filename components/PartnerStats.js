export default function PartnerStats({transactions}){

const partners={}

transactions.forEach(t=>{

const amount=Number(t.amount)

if(!partners[t.partner]) partners[t.partner]=0

if(t.type==="Receive") partners[t.partner]+=amount
else partners[t.partner]-=amount

})

return(

<div>

<h3>Partner Profit</h3>

{Object.keys(partners).map(p=>(

<p key={p}>
{p} : {partners[p]}
</p>

))}

</div>

)

}