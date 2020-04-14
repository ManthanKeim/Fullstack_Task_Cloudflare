addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */


    
async function handleRequest(request) {
    let cache = caches.default
    const resp = await fetch("https://cfw-takehome.developers.workers.dev/api/variants")
    const data = await resp.json()
    
    var randomValue = Math.random();
    if(randomValue < 0.5){
        const resp2 = await fetch(data['variants'][0]);
        const data2 = await resp2.body;
        return new Response(data2)
    }
    else{
        const resp2 = await fetch(data['variants'][1]);
        const data2 = await resp2.body;
        return new Response(data2)
    }
}
