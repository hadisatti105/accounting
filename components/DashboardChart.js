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

export default function DashboardChart({transactions}){

let received = 0
let sent = 0

transactions.forEach(t => {

const amount = Number(t.amount || 0)

if(t.type === "Receive") received += amount
if(t.type === "Send") sent += amount

})

const data = {

labels:["Received","Sent"],

datasets:[
{
label:"Money Flow",
data:[received,sent]
}
]

}

return(

<div style={{width:"400px",marginTop:"30px"}}>

<h2>Money Flow Chart</h2>

<Bar data={data} />

</div>

)

}