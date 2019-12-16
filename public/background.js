var appState = null;
var logoutTime = 0;
let timeoutHandle = null;

var clearLogoutTimer = () => {
  if (timeoutHandle) {
    window.clearTimeout(timeoutHandle);
  }
};

var setLogoutTimer = time => {
  clearLogoutTimer();
  timeoutHandle = window.setTimeout(() => {
    appState = null;
  }, time);
};

chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "bgWatchdog") {
    port.onDisconnect.addListener(() => {
      setLogoutTimer(logoutTime);
    });
  }
});
