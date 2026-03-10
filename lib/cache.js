let transactionsCache = null
let lastFetchTime = 0

export function getCache(){
return transactionsCache
}

export function setCache(data){
transactionsCache = data
lastFetchTime = Date.now()
}

export function cacheValid(){

const CACHE_TIME = 1000 * 60 * 2 // 2 minutes

return transactionsCache && (Date.now() - lastFetchTime < CACHE_TIME)

}