
async function getToken() {
  const res = await fetch(chrome.runtime.getURL("token.json"));
  const { token } = await res.json();
  return token;
}

async function fetchCookies(appId) {
  const token = await getToken();
  const res = await fetch(`http://your-vps-host:3000/cookies/${token}/${appId}`);
  const cookies = await res.json();
  return cookies;
}

async function setCookies(cookies) {
  for (const cookie of cookies) {
    const details = {
      ...cookie,
      url: `https://${cookie.domain.replace(/^\./, "")}`
    };
    delete details.domain;
    delete details.httpOnly;
    chrome.cookies.set(details);
  }
}

chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.action === "openApp") {
    chrome.tabs.create({ url: msg.url }, async () => {
      const cookies = await fetchCookies(msg.app);
      await setCookies(cookies);
    });
  }
});
