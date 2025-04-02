document.getElementById('resetButton').addEventListener('click', function() {
  chrome.storage.local.set({ numOfUses: 0 }, () => {
  });
});