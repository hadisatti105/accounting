import {Bar} from "react-chartjs-2"

export default function BankChart({transactions}){

const banks={}

transactions.forEach(t=>{

const amount=Number(t.amount)

if(!banks[t.bank]) banks[t.bank]=0

if(t.type==="Receive") banks[t.bank]+=amount
else banks[t.bank]-=amount

})

const data={

labels:Object.keys(banks),

datasets:[

{
label:"Bank Balance",
data:Object.values(banks)
}

]

}

return <Bar data={data}/>

}