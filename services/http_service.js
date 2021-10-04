// function to make Ajax call using Promise
function makeServiceCall(methodType, url, async = true, data = null) {
  return new Promise(function (resolve, reject) {
    // xhr object is created
    let xhr = new XMLHttpRequest();

    // on ready state
    xhr.onreadystatechange = function () {
      console.log("State Changed Called. ReadyState: " + xhr.readyState + " Status: " + xhr.status);

      // check status == 200 ? resolve : reject
      if (xhr.status.toString().match('^[2][0-9]{2}$')) {
        resolve(xhr.responseText);
      } else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
        console.log("XHR failed");
      }
    }

    // open connection
    xhr.open(methodType, url, async);
    // check methodType
    if (data) {
      // POST method
      console.log(JSON.stringify(data));
      xhr.setRequestHeader("Content-Type", "application/json");
      // send request
      xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
  });
}