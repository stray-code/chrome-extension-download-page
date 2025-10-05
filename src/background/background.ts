const id = 'savePageAsMHTML';

const blobToDataURL = (blob: Blob) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.readAsDataURL(blob);
  });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id,
    title: 'ページをダウンロード',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === id) {
    if (!tab?.id) {
      return;
    }

    const mhtmlData = await chrome.pageCapture.saveAsMHTML({ tabId: tab.id });

    if (!mhtmlData) {
      return;
    }

    // NOTE: URL.createObjectURLが使えないため代用
    const dataUrl = await blobToDataURL(mhtmlData);

    const cleanTitle =
      tab.title?.replace(/[/\\:*?"<>|]/g, '_') || 'page_capture';

    const fileName = `${cleanTitle}.mhtml`;

    chrome.downloads.download({
      url: dataUrl,
      filename: fileName,
    });
  }
});
