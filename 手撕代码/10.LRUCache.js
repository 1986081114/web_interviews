
//lru least recently used 最近最少使用， 核心思想就是数据最近被访问过， 那么将来被访问的几率也会更高
//有get和put两个方法，get方法用于获取LRUCache中的值，不存在返回-1；put方法用于向LRUCache存入数值，当达到它的容量时，替换最近最少使用的
代码如下：
/**
 * @param {number} capacity
 */
 var LRUCache = function(capacity) {
    this.size = capacity;
    this.cache = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    if(this.cache.has(key)){
        let temp = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key,temp)
        return this.cache.get(key)
    }else{
        return -1
    }
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.cache.has(key)){
        this.cache.delete(key,value)
    }else{
        if(this.cache.size>=this.size){
            this.cache.delete(this.cache.keys().next().value)
        }
    }
    this.cache.set(key,value)
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */