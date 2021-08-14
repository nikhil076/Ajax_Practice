const { log, error } = require("console");

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State change called. Ready state: " + xhr.readyState + "Status: " + xhr.status);
            if (xhr.status === 200 || xhr.status === 201)
                resolve(xhr.responseText);
            else if (xhr.status >= 400) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR failed");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        }
        else xhr.send();
        console.log(methodType + " request sent to the server");
    });
}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => console.log("Get user data: " + responseText))
    .catch(error => console.log("GET eror status: " + JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => console.log("User deleted: " + responseText))
    .catch(error => console.log("DELETE eror status: " + JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const empData = { "name": "Harry", "salary": "5000" };
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => console.log("User added: " + responseText))
    .catch(error => console.log("POST error status: " + JSON.stringify(error)));