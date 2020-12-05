const cache = require('memory-cache')
let KEY_QUEUE = []

function putToCache(key, data) {
    if (cache.size() === 10) {
        cache.delete(KEY_QUEUE[0])
        KEY_QUEUE = KEY_QUEUE.slice(1)
    }
    KEY_QUEUE.push(key)
    cache.put(key, data)
}
function getValueByKey(key) {
    return cache.get(key)
}

module.exports = { putToCache, getValueByKey }
