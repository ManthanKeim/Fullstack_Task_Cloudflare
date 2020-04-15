addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */



class LinkRewriter {
    element(element) {
        element.setAttribute('href', 'https://manthankeim.github.io')
        element.setInnerContent('Manthan`s Portfolio')
    }
}


class BodyRewriter {
    element(element) {
        element.setInnerContent('Just changed the content so that you cant figure out what was here before', { html: true} )
    }
}

const REWRITER  = new HTMLRewriter()
.on('p#description', new BodyRewriter())
.on('a#url', new LinkRewriter())
    
async function handleRequest(request) {
    let cache = caches.default
    const resp = await fetch("https://cfw-takehome.developers.workers.dev/api/variants")
    const data = await resp.json()
    
    var randomValue = Math.random();
    if(randomValue < 0.5){
        const resp2 = await fetch(data['variants'][0]);
//        const data2 = await resp2.body;
        return new Response(REWRITER.transform(resp2).body)
    }
    else{
        const resp2 = await fetch(data['variants'][1]);
        const data2 = await resp2.body;
        return new Response(data2)
    }
}
