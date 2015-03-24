function supports_history_api() {
  if (Modernizr.history) {
      return !!(window.history && history.pushState);
   } else {
      alert("No soporta History con HTML5");
  } 
}

function swapPhoto(href) {
  var req = new XMLHttpRequest();
  req.open("GET",
           "http://localhost:4000/gallery/" +
             href.split("/").pop(),
           false);
  req.send(null);
  if (req.status == 200) {
    document.getElementById("gallery").innerHTML = req.responseText;
    setupHistoryClicks();
    return true;
  }
  return false;
}

function addClicker(link) {
  link.addEventListener("click", function(e) {
    if (swapPhoto(link.href)) {
      history.pushState(null, null, link.href);
      e.preventDefault();
    }
  }, true);
}

function setupHistoryClicks() {
  addClicker(document.getElementById("photonext"));
  addClicker(document.getElementById("photoprev"));
}

window.onload = function() {
  if (!supports_history_api()) { return; }
  setupHistoryClicks();
  window.setTimeout(function() {
    window.addEventListener("popstate", function(e) {
      swapPhoto(location.pathname);
    }, false);
  }, 1);
}

