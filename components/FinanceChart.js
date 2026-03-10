import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js"

import { Bar } from "react-chartjs-2"


ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
)

export default function FinanceChart({transactions}){

let receive=0
let send=0

transactions.forEach(t=>{

const amount=Number(t.amount)

if(t.type==="Receive") receive+=amount
if(t.type==="Send") send+=amount

})

const data={

labels:["Received","Sent"],

datasets:[

{
label:"Finance",
data:[receive,send]
}

]

}

const options={

responsive:true,

plugins:{
legend:{
position:"top"
},
title:{
display:true,
text:"Finance Overview"
}
}

}

return(

<div style={{maxWidth:"600px"}}>

<Bar data={data} options={options}/>

</div>

)

}