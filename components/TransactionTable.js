export default function TransactionTable({transactions}){

return(

<table border="1" cellPadding="10" style={{marginTop:20}}>

<thead>

<tr>

<th>Date</th>
<th>Partner</th>
<th>Type</th>
<th>Name</th>
<th>Bank</th>
<th>Amount</th>

</tr>

</thead>

<tbody>

{transactions.map((t)=> (

<tr key={t.id}>

<td>{t.date}</td>
<td>{t.partner}</td>
<td>{t.type}</td>
<td>{t.name}</td>
<td>{t.bank}</td>
<td>{t.amount}</td>

</tr>

))}

</tbody>

</table>

)

}