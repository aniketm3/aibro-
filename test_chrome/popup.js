document.getElementById("viewCapture").addEventListener("click", () => {
    chrome.storage.local.get("lastCapture", (data) => {
      if (data.lastCapture) {
        document.getElementById("screenshot").src = data.lastCapture;
      }
    });
  });
  