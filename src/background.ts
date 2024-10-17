chrome.tabs.onUpdated.addListener(
  (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    console.log(`Change URL: ${tab.url}`);
  }
);

chrome.bookmarks.getRecent(
  10,
  (results: chrome.bookmarks.BookmarkTreeNode[]) => {
    console.log(`bookmarks:`, results);
  }
);

console.log(`this is background service worker`);

export {};
