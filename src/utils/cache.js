const mcache = require('memory-cache');

const Cache = {
   duration: 1000*60*10,
    getCache(key){
       let cachedContent = mcache.get(key)
       if (cachedContent) {
        return cachedContent
       } 
   
       return false
   },
   setCache(key, content){
     return mcache.put(key, content, this.duration);
   }
}
module.exports = Cache
