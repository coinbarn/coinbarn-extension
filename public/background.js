let appState = null;
let logoutTime = 0;
let timeoutHandle = null;

let clearLogoutTimer = () => {
  if (timeoutHandle) {
    window.clearTimeout(timeoutHandle);
  }
};

let setLogoutTimer = time => {
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
