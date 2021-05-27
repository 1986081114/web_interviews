let paxios = {

    get : function(url = null, method = 'GET', async = true) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open(method, url, async)
            xhr.send()
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                   resolve(xhr.responseType)
                }
            }
            xhr.onerror = function(err) {
                reject(err)
            }
        })
    },
    post : function(url = null, method = 'POST', async = true,data = {}) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest()
            xhr.open(method, url, async)
            xhr.send(data)
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                   resolve(xhr.responseType)
                }
            }
            xhr.onerror = function(err) {
                reject(err)
            }
        })
    }

}