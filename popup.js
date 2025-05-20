
const apps = {
  bstation: "https://www.bilibili.tv",
  yt: "https://www.youtube.com",
  fb: "https://www.facebook.com",
  tt: "https://www.tiktok.com",
  ig: "https://www.instagram.com"
};

for (const [id, url] of Object.entries(apps)) {
  document.getElementById(id).addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "openApp", app: id, url });
  });
}
