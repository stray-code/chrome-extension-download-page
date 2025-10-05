const init = async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.id) {
    return;
  }

  const mhtmlBlob = await chrome.pageCapture.saveAsMHTML({ tabId: tab.id });

  if (!mhtmlBlob) {
    return;
  }

  // NOTE: mhtmlはchrome.downloads.downloadが使えないため、通常の方法でダウンロード
  const a = document.createElement('a');
  a.href = URL.createObjectURL(mhtmlBlob);
  a.download = `${tab.title}.mhtml`;
  a.click();

  window.close();
};

init();
