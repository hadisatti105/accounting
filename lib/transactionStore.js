let cache = null
let lastFetch = 0

const CACHE_TIME = 1000 * 60 // 1 minute

export function getTransactionsCache(){
if(cache && Date.now() - lastFetch < CACHE_TIME){
return cache
}
return null
}

export function setTransactionsCache(data){
cache = data
lastFetch = Date.now()
}