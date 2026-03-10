export default function Stats({transactions}){

let received=0
let sent=0

const partners={}
const banks={}

transactions.forEach(t=>{

const a=Number(t.amount||0)

if(!partners[t.partner]) partners[t.partner]=0
if(!banks[t.bank]) banks[t.bank]=0

if(t.type==="Receive"){

received+=a
partners[t.partner]+=a
banks[t.bank]+=a

}

if(t.type==="Send"){

sent+=a
partners[t.partner]-=a
banks[t.bank]-=a

}

})

const balance=received-sent

return(

<div>

<div className="cards">

<div className="card">
<h3>Received</h3>
<p>{received}</p>
</div>

<div className="card">
<h3>Sent</h3>
<p>{sent}</p>
</div>

<div className="card">
<h3>Balance</h3>
<p>{balance}</p>
</div>

</div>

<h3>Partner Profit</h3>

{Object.keys(partners).map(p=>(

<div key={p}>{p}: {partners[p]}</div>

))}

<h3 style={{marginTop:"20px"}}>Bank Balances</h3>

{Object.keys(banks).map(b=>(

<div key={b}>{b}: {banks[b]}</div>

))}

</div>

)

}