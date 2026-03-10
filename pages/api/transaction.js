const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzn0LYWL-0i-jR4N_Xzb6H0BPLNm8U7D8gqYmEHrVOYaDkLJ-g-zOnOTzfxBcnlm4AgtA/exec"

// simple cache
let cache = null
let cacheTime = 0
const CACHE_TIME = 1000 * 60 // 1 minute

export default async function handler(req,res){

try{

//////////////////////////
// GET TRANSACTIONS
//////////////////////////

if(req.method === "GET"){

if(cache && Date.now() - cacheTime < CACHE_TIME){
return res.status(200).json(cache)
}

const r = await fetch(SCRIPT_URL)

const data = await r.json()

cache = data
cacheTime = Date.now()

return res.status(200).json(data)

}

//////////////////////////
// ADD TRANSACTION
//////////////////////////

if(req.method === "POST"){

await fetch(SCRIPT_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"add",
...req.body
})
})

cache = null

return res.status(200).json({success:true})

}

//////////////////////////
// DELETE
//////////////////////////

if(req.method === "DELETE"){

await fetch(SCRIPT_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"delete",
id:req.body.id
})
})

cache = null

return res.status(200).json({success:true})

}

//////////////////////////
// UPDATE
//////////////////////////

if(req.method === "PUT"){

await fetch(SCRIPT_URL,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
action:"update",
...req.body
})
})

cache = null

return res.status(200).json({success:true})

}

}catch(error){

console.log("API ERROR:",error)

res.status(500).json({error:"server error"})

}

}