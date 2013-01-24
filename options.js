function save_options() {
  var url = document.getElementById("xbmc-url").value;
  if (!url) {
    alert('Enter valid XBMC JSON RPC url');
    return;
  }
  var status = document.getElementById("status");

  json_rpc(url, 'JSONRPC.Version', null, function(data) {
    if (!data) {
      status.innerHTML = 'Error accessing XBMC. Check Url';
    } else {
      localStorage["xbmc_url"] = url;      
      localStorage["version"] = data.version;          
      status.innerHTML = "Options Saved.";
      setTimeout(function() {
        status.innerHTML = "";
      }, 1500);
    }
  });
}

function restore_options() {
  var url = localStorage["xbmc_url"];
  if (!url)
    return;
  document.getElementById("xbmc-url").value = url;
}

// Add event listeners once the DOM has fully loaded by listening for the
// `DOMContentLoaded` event on the document, and adding your listeners to
// specific elements when it triggers.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button').addEventListener('click', save_options);
  restore_options();
});