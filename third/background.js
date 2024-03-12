chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });

function insertTime(){
    const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p");
  // Use the same styling as the publish information in an article's header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.id = "timeEntered";
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  (date ?? heading).insertAdjacentElement("afterend", badge);
}
}

function removeTime(){
    document.getElementById("timeEntered").remove();
}

  const extensions = 'https://developer.chrome.com/docs/extensions'
  const webstore = 'https://developer.chrome.com/docs/webstore'
  
  function reddenPage() {
    document.body.style.backgroundColor = 'red';
  }

  function unreddenPage(){
    document.body.style.backgroundColor='black';
  }

  chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      if(prevState == 'OFF'){
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files : ["focus-mode.css"]
          });
          chrome.scripting.executeScript({
            target : {tabId : tab.id},
            func : insertTime
          });
      }else {
        chrome.scripting.removeCSS({
            target : {tabId : tab.id},
            files : ["focus-mode.css"]
        });
        chrome.scripting.executeScript({
            target : {tabId : tab.id},
            func : removeTime
          });
      }
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });
    }
  });
