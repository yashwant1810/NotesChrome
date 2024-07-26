chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "saveSelectedText",
      title: "Save Selected Text",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveSelectedText") {
      const selectedText = info.selectionText;
      chrome.storage.local.get({ savedTexts: [] }, (result) => {
        const savedTexts = result.savedTexts;
        savedTexts.push(selectedText);
        chrome.storage.local.set({ savedTexts: savedTexts }, () => {
          console.log("Text saved successfully.");
        });
      });
    }
  });