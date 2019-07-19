export function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false);
    //xmlHttp.send( null );
    return xmlHttp.responseText;
}

export function httpPost(theUrl, data) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, true);
    xmlHttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xmlHttp.setRequestHeader("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    xmlHttp.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    xmlHttp.setRequestHeader("Content-type", "application/json");
    xmlHttp.send(data);
    return xmlHttp.responseText;
}