function json_rpc(url, method, params, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    var json = {jsonrpc: "2.0", method: method, id: "1"};
    if (params)
        json.params = params;
    /*
    var timerId = setTimeout(function() {
        console.log("json_rpc aborted");
        xhr.abort();
        if (callback)
            callback(null);
    }, 30000);
    */
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            var response = null;
            if (xhr.status == 200 && xhr.responseText) {
                console.log('json_rpc got response: ' + xhr.responseText);
                //clearTimeout(timerId);
                response = JSON.parse(xhr.responseText).result;
            } else {
                console.log('json_rpc bad response: ' + xhr.status + " " + xhr.responseText);
            }
            if (callback)
                callback(response);
        }
    };
    var post = JSON.stringify(json);
    console.log('json_rpc sending to ' + url + ': ' + post);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(post);
}
