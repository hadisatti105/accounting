import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export default function DashboardCharts({ transactions }) {

let received = 0
let sent = 0

transactions.forEach(t => {

if (t.type === "Receive") received += Number(t.amount)
if (t.type === "Send") sent += Number(t.amount)

})

const data = {

labels: ["Received", "Sent"],

datasets: [

{
label: "Money Flow",
data: [received, sent]
}

]

}

return (

<div style={{marginTop:40}}>

<h2>Money Flow Chart</h2>

<div style={{width:"400px"}}>

<Bar data={data} />

</div>

</div>

)

}